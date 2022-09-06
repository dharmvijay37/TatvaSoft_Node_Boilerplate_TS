import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

export class UserService {
 
    public static async getUserList(req: Request, res: Response) {
        try {
            const users = await User.findAll({ where: { role: 'user' } , attributes: ['id', 'email','role','createdAt'] });
            if (!users) {
                return res.status(400).json({ message: 'You need to register first..!' });
            } else {
                return res.status(200).json({
                    message: 'Signin successfully',
                    status: 200,
                    response_data: users,
                });
            }
        } catch (err) {
          return res.status(500).json({ message: 'Something went wrong' });
        }
    }

}
