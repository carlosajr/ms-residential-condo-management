// shared/http/decorators/methods/Get.ts
import { Route } from '../Route';

export const Get = (path = '/') => Route('get', path);
