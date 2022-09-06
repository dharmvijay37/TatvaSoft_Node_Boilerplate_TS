import { Router, Request, Response, NextFunction } from 'express';
import { AuthService } from '../service';

export class RegisterRepository {

  // Routes will call repos, Repo will be a single responsibility class
  public static async register(req: Request, res: Response) {
    try {
      // Write computing operations here
      return AuthService.register(req,res);
    } catch (err) {
      return { message: 'Something went wrong' };
    }
  }

}
