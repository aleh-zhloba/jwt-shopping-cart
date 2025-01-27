import { Request, Response, NextFunction } from 'express'
import { BusinessLogicError } from '../errors/BusinessLogicError'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof BusinessLogicError) {
    // Handle generic business logic errors
    res.status(400).json({
      code: err.code,
      message: err.message,
    })
  } else {
    console.log(err)
    res.status(500).json({
      code: 'server_internal_error',
      message: 'Internal server error.',
    })
  }
}