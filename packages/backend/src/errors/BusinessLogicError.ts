export class BusinessLogicError extends Error {
  code: string
  constructor(code:string, message: string) {
    super(message)
    this.code = code

    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this)
  }
}

export class NotFoundError extends BusinessLogicError {}