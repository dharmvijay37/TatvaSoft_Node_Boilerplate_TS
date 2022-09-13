import { Router, Request, Response, NextFunction } from 'express';
import { AuthService } from '../service';

export class LoginRepository {
  // Routes will call repos, Repo will be a single responsibility class
  public static async login(req: Request, res: Response) {
    try {
      // Write computing operations here
      return AuthService.login(req,res);
    } catch (err) {
      return err;
    }
  }
}
