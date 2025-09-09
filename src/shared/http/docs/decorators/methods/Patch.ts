// shared/http/decorators/methods/Get.ts
import { Route } from '../Route';

export const Patch = (path = '/') => Route('patch', path);
