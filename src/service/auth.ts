import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import environmentConfig from '../constants/environment.constant';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GenericErrorHandler } from '../utils/error.handler';
export class AuthService {
 
    public static async login(req: Request, res: Response) {
        try {
          const { email, password } = req.body;
          if (!email || !password) {
            throw new Error('validation failed');
          }
    
          const users = await User.findOne({ where: { email: email } });
          if (!users) {
            throw new Error('Not Found');
          } else {
            const passwordMatched = bcrypt.compareSync(password, users.password);
            if (!passwordMatched) {
              throw new Error('Unauthorized');
            } else {
              const token = jwt.sign({ id: users.id, role: users.role }, environmentConfig.JWT_SECRET);
              const data = {
                email: users.email,
                role: users.role,
                token: 'Bearer ' + token,
              };
              return res.status(200).json({
                message: 'Signin successfully',
                status: 200,
                response_data: data,
              });
            }
          }
        } catch (error: any) {
          const errorBody = await new GenericErrorHandler(error);
          return res.status(200).json(errorBody);
        }
    }
    public static async register(req: Request, res: Response) {
        try {
          const { email, password, role } = req.body;
    
          const users = await User.findOne({ where: { email: email } });
          if (users) {
            throw new Error('User already exist..!');
          } else {
            const hashPassword = await bcrypt.hashSync(password, 12);
            const newuser = await User.create({
              email,
              password: hashPassword,
              role,
            });
            if (!newuser) {
              throw new Error('Internal Error');
            } else {
              return res.status(200).json({ message: 'New user registered successfully' });
            }
          }
        } catch (error: any) {
          console.log(error)
          const errorBody = await new GenericErrorHandler(error);
          return res.status(200).json(errorBody);
        }
    }
}
