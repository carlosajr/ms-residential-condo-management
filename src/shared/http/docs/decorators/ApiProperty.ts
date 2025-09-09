import 'reflect-metadata';
import { METADATA_KEYS } from '@/shared/http/docs/decorators/metadataKeys';

interface ApiPropertyOptions {
  enum?: object;
  description?: string;
  example?: any;
  required?: boolean;
  type?: any;
}

export function ApiProperty(options: ApiPropertyOptions = {}): PropertyDecorator {
  return (target, propertyKey) => {
    const existingProps: (string | symbol)[] =
      Reflect.getMetadata(METADATA_KEYS.API_PROPERTIES, target) || [];

    // Adiciona a propriedade à lista de propriedades decoradas
    Reflect.defineMetadata(
      METADATA_KEYS.API_PROPERTIES,
      [...new Set([...existingProps, propertyKey])],
      target,
    );

    // Define os metadados específicos para esta propriedade
    Reflect.defineMetadata(
      `${METADATA_KEYS.API_PROPERTIES}:${String(propertyKey)}`,
      options,
      target,
    );
  };
}
