import 'reflect-metadata';

import { METADATA_KEYS } from './metadataKeys';

export function ApiQuery(dtoClass: any): MethodDecorator {
  return (_target, _propertyKey, descriptor) => {
    Reflect.defineMetadata(METADATA_KEYS.QUERY, dtoClass, descriptor.value!);
  };
}
