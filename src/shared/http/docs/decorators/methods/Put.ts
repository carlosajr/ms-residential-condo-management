// shared/http/decorators/methods/Get.ts
import { Route } from '../Route';

export const Put = (path = '/') => Route('get', path);
