/*
    Ruta: /api/search
*/

import { Router } from 'express';
import { check } from 'express-validator';
import AuthController from '../controllers/auth.controller';
import { validateField } from '../middlewares/fieldValidator.middleware';
import { SearchController } from '../controllers/search.controller';

const searchRouter = Router();

searchRouter.get('/:collection/:term', [
  // check('email', 'The email is required').isEmail(),
  // check('password', 'The password is required').not().isEmpty(),
  // validateField
], SearchController.search);


searchRouter.get('/:term', [
  // check('email', 'The email is required').isEmail(),
  // check('password', 'The password is required').not().isEmpty(),
  // validateField
], SearchController.searchAllByName);

export default searchRouter;
