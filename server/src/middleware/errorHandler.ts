import { Request, Response, NextFunction } from 'express'
import { AppError } from '../types'

export function errorHandler(
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
    })
    return
  }

  // Log unexpected errors
  console.error('[ERROR]', err)

  // Don't leak error details in production
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message

  res.status(500).json({
    error: message,
  })
}
