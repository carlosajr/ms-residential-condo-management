import 'reflect-metadata';

import { METADATA_KEYS } from './metadataKeys';

interface ApiParamOptions {
  name: string;
  description?: string;
  required?: boolean;
  type?: 'string' | 'number' | 'integer' | 'boolean';
  example?: any;
}

export function ApiParam(options: ApiParamOptions): MethodDecorator {
  return (target, propertyKey, descriptor: any) => {
    const existingParams = Reflect.getMetadata(METADATA_KEYS.PARAMS, descriptor.value) || [];
    existingParams.push({
      ...options,
      in: 'path',
      required: options.required ?? true, // Path params são geralmente obrigatórios
    });
    Reflect.defineMetadata(METADATA_KEYS.PARAMS, existingParams, descriptor.value);
  };
}