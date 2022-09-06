import { Router, Request, Response } from 'express';
import { LoginRepository, RegisterRepository } from '../repositories';
const router = Router({ mergeParams: true });
import authSchema from '../validation/auth.validate';

import { celebrate } from 'celebrate';


router.post('/login', celebrate(authSchema.SigninSchema), LoginRepository.login);
router.post('/register', celebrate(authSchema.SignupSchema), RegisterRepository.register);

export default router;