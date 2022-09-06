import { Router, Request, Response } from 'express';
import { UserListRepository } from '../repositories';
const router = Router({ mergeParams: true });
import { verifyUser, verifyAdmin } from '../middleware';
import authSchema from '../validation/auth.validate';

import { celebrate } from 'celebrate';


router.get('/userlist', verifyUser, UserListRepository.getUserList);

export default router;