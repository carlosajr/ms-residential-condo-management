import { container } from 'tsyringe';
import { IRedisClient, REDIS_CLIENT } from '../../IRedisClient';

type InvalidateOptions = {
  prefix: string;
};

export function InvalidateCacheOnSuccess(options: InvalidateOptions) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const redis = container.resolve<IRedisClient>(REDIS_CLIENT);

      const result = await originalMethod.apply(this, args);

      const pattern = `${options.prefix}*`;
      await redis.deleteCacheByPattern(pattern);

      return result;
    };

    return descriptor;
  };
}
