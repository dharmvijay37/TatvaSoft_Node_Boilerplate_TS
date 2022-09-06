import { Request, Response, NextFunction } from 'express';
import environmentConfig from '../constants/environment.constant';
import User from '../models/user.model';
import { MyUserRequest } from '../interface';
import jwt = require('jsonwebtoken');

export const verifyToken = () => {
  return 'Token verified';
};

export const verifyUser = async (req: MyUserRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers as any;
  if (!authorization) {
    return res.status(400).json({ message: 'Inavalid token..!', status: 400 });
  }

  const scheme = authorization.split(' ')[0];
  if (scheme !== 'Bearer') {
    return res.status(400).json({ message: 'Invalid Token..!', status: 400 });
  }
  const token = authorization.split(' ')[1];
  console.log('Token:', token);
  jwt.verify(token, environmentConfig.JWT_SECRET, async (err: any, payload: any) => {
    if (err) {
      return res.status(400).json({ message: 'Inavalid username or password..!', status: 400 });
    }
    const { id } = payload;
    const user = await User.findOne({ where: { id } });
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(400).json({ message: 'User not found..!', status: 400 });
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
