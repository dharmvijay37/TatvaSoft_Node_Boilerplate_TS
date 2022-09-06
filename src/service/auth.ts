import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import environmentConfig from '../constants/environment.constant';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export class AuthService {
 
    public static async login(req: Request, res: Response) {
        try {
          const { email, password } = req.body;
          if (!email || !password) {
            return res.status(400).json({ message: 'please add all fields..!' });
          }
    
          const users = await User.findOne({ where: { email: email } });
          if (!users) {
            return res.status(400).json({ message: 'You need to register first..!' });
          } else {
            const passwordMatched = bcrypt.compareSync(password, users.password);
            if (!passwordMatched) {
              return res.status(401).json({ message: 'Invalid username or password' });
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
        } catch (err) {
          return res.status(500).json({ message: 'Something went wrong' });
        }
      }
      public static async register(req: Request, res: Response) {
        try {
          const { email, password, role } = req.body;
    
          const users = await User.findOne({ where: { email: email } });
          if (users) {
            return res.status(400).json({ message: 'User already exist..!' });
          } else {
            const hashPassword = await bcrypt.hashSync(password, 12);
            const newuser = await User.create({
              email,
              password: hashPassword,
              role,
            });
            if (!newuser) {
              return res.status(401).json({ message: 'something went wrong..!' });
            } else {
              return res.status(200).json({ message: 'New user registered successfully' });
            }
          }
        } catch (err) {
          return res.status(500).json({ message: 'Something went wrong' });
        }
      }

}
