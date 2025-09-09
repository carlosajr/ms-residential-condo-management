// shared/http/decorators/methods/Get.ts
import { Route } from '../Route';

export const Delete = (path = '/') => Route('delete', path);
