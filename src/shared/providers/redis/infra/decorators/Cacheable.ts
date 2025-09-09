import { container } from 'tsyringe';
import { IRedisClient, REDIS_CLIENT } from '../../IRedisClient';

type CacheOptions = {
  key?: string;
  ttl?: number;
};

export function Cacheable(options: CacheOptions = {}) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const redis = container.resolve<IRedisClient>(REDIS_CLIENT);

      const dynamicKey = `${options.key || propertyKey}:${JSON.stringify(args)}`;
      const cached = await redis.getJson(dynamicKey);

      if (cached) return cached;

      const result = await originalMethod.apply(this, args);
      await redis.setJson(dynamicKey, result, {
        expiration: { type: 'EX', value: options.ttl || 300 },
      });

      return result;
    };

    return descriptor;
  };
}
