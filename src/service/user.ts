import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import { NotFoundError } from '../utils/error.handler';
export class UserService {
  public static async getUserList(req: Request, res: Response) {
    try {
      const users = await User.findAll({ where: { role: 'user' }, attributes: ['id', 'email', 'role', 'createdAt'] });
      if (!users) {
        throw new NotFoundError('404', 'Not Found');
      } else {
        return res.status(200).json({
          message: 'Signin successfully',
          status: 200,
          response_data: users,
        });
      }
    } catch (error: any) {
      return error;
    }
  }
}
