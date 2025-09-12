import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string | number;
      email: string;
      isAdmin: boolean;
    };
  }
}
