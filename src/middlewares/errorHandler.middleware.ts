import { Request, Response, NextFunction } from 'express';
import CustomError from '../exceptions/custom-error';
import CustomResponse from '../dtos/custom-response';
import PlainDto from '../dtos/plain.dto';
import ResponseErrorDto from '../dtos/response-error.dto';
import logger from '../config/logger';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  // Log the full error object for internal debugging
  logger.error(`Error: ${err.message || 'Unknown error'}`, {
    error: err, // Pass the full error object
    request: { method: req.method, url: req.originalUrl, body: req.body, ip: req.ip },
    stack: err.stack, // Ensure stack is logged
  });

  if (!(err instanceof CustomError)) {
    const response: CustomResponse<PlainDto> = {
      success: false,
      message: process.env.NODE_ENV === 'development' ? err.message : 'Server error, please try again later',
    };

    res.status(500).json(response);
    return;
  } else {
    const customError = err as CustomError;

    let response = {
      message: customError.message,
    } as ResponseErrorDto;

    // Check if there is more info to return.
    if (customError.additionalInfo) {
      response.additionalInfo = customError.additionalInfo;
    }

    const jsonResponse: CustomResponse<PlainDto> = {
      success: false,
      message: response.message,
      errors: response.additionalInfo ? [response.additionalInfo] : undefined,
    };

    res.status(customError.status).json(jsonResponse);
    return;
  }
}
