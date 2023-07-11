import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';
    const errorCode: String = status > 400 && status < 500 ? 'BUSINESS_EXCEPTION' : 'SERVER_EXCEPTION';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message},${error.stack}`);
    res.status(status).json({ message, errorCode });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
