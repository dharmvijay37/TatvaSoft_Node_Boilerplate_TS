import { Request } from 'express';
export interface MyUserRequest extends Request {
  user?: any;
}
