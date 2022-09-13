import { Request, Response, NextFunction } from 'express';
import environmentConfig from '../constants/environment.constant';
import User from '../models/user.model';
import { MyUserRequest } from '../interface';
import jwt = require('jsonwebtoken');
import { AuthFailureError } from '../utils/error.handler';


export const verifyToken = () => {
  return 'Token verified';
};

export const verifyUser = async (req: MyUserRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers as any;
  if (!authorization) {
    throw new AuthFailureError('401', 'Invalid Token..!');
  }

  const scheme = authorization.split(' ')[0];
  if (scheme !== 'Bearer') {
    throw new AuthFailureError('401', 'Invalid Token..!');
  }
  const token = authorization.split(' ')[1];
  console.log('Token:', token);
  jwt.verify(token, environmentConfig.JWT_SECRET, async (err: any, payload: any) => {
    if (err) {
      throw new AuthFailureError('401', 'Inavalid username or password..!');
    }
    const { id } = payload;
    const user = await User.findOne({ where: { id } });
    if (user) {
      req.user = user;
      next();
    } else {
      throw new AuthFailureError('401', 'User not found..!');
    }
  });
};

export const verifyAdmin = async (req: MyUserRequest, res: Response, next: NextFunction) => {
  if (req.user?.role == 'admin') {
    next();
  } else {
    return res.status(400).json({ message: 'You have no permission..!', status: 400 });
  }
};
