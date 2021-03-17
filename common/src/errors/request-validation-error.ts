import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

// interface CustomError {
//     statusCode: number;
//     serializeErrors(): {
//         message: string;
//         field?: string;
//     }[]
// }

// Add implements CustomError after Error for option 1 lect.133
export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
