/*
    Ruta: /api/users
*/

import { Router } from 'express';
import { check } from 'express-validator';
import { UsersController } from '../controllers/users.controllers';
import { validateField } from '../middlewares/fieldValidator.middleware';
import { isValidRole, existsEmail, existsUserById } from '../helpers/db-validators';



const usersRouter = Router();

usersRouter.get('/', UsersController.Get);

usersRouter.put('/:id',[
  check('id', 'The id is not valid').isMongoId(),
  check('id').custom(existsUserById),
  check('role').custom( isValidRole ),
  validateField
], UsersController.Put);

usersRouter.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email format invalid').isEmail(),
    check('password', 'The password is required and must contain 6 character').isLength({ min: 6 }),
    // check('role', 'The role is invalid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isValidRole ),
    check('email').custom( existsEmail ),
    validateField

], UsersController.Post);

usersRouter.delete('/:id', [
  check('id', 'The id is not valid').isMongoId(),
  check('id').custom(existsUserById),
  validateField
], UsersController.Delete);

export default usersRouter;
