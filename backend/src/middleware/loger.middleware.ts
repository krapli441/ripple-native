import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request:', req.method, req.originalUrl);
    res.on('finish', () => {
      console.log('Response:', res.statusCode);
    });
    next();
  }
}
