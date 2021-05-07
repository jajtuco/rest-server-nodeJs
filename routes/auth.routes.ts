/*
    Ruta: /api/auth
*/

import { Router } from 'express';
import { check } from 'express-validator';
import AuthController from '../controllers/auth.controller';
import { validateField } from '../middlewares/fieldValidator.middleware';

const authRouter = Router();

authRouter.post('/login', [
  check('email', 'The email is required').isEmail(),
  check('password', 'The password is required').not().isEmpty(),
  validateField
], AuthController.login);

authRouter.post('/google', [
  check('id_token', 'The id_token is required').not().isEmpty(),
  validateField
], AuthController.googleSignIn);


export default authRouter;
