import { NextFunction, Request, Response } from 'express';

export function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: 'Admins only' });
  }
  return next();
}
