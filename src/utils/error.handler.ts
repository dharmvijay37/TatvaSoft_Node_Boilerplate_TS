/**
 * Base Error Class
 */
export class BaseError extends Error {
  public data: object | undefined;

  public code: string | undefined;

  constructor(code: string, message: string, data?: object | undefined) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.code = code;
    this.data = data;
  }
}

export class BadRequestError extends BaseError {}

export class ForbiddenError extends BaseError {}

export class AuthFailureError extends BaseError {}

export class InternalError extends BaseError {}

export class NotFoundError extends BaseError {}
