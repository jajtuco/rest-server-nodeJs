/*
    Ruta: /api/category
*/

import { Router } from 'express';
import { check } from 'express-validator';
import { isValidRole, existsEmail, existsUserById, existsCategoryById } from '../helpers/db-validators';

// Middlewares
import { isAdminRole, containRoles, validateJWT, validateField } from '../middlewares/index';
import { CategoryController } from '../controllers/category.controller';


const categoryRouter = Router();

categoryRouter.get('/', CategoryController.GetAll);

categoryRouter.get('/:id', [
  check('id', 'The id is not valid').isMongoId(),
  check('id').custom(existsCategoryById),
  validateField
], CategoryController.Get);

categoryRouter.post('/', [
  validateJWT,
  check('name', 'The name is required').not().isEmpty(),
  validateField
], CategoryController.Post);

categoryRouter.put('/:id', [
  validateJWT,
  check('name', 'The name is required').not().isEmpty(),
  check('id', 'The id is not valid').isMongoId(),
  check('id').custom(existsCategoryById),
  validateField
], CategoryController.Put);

categoryRouter.delete('/:id', [
  validateJWT,
  isAdminRole,
  check('id', 'The id is not valid').isMongoId(),
  check('id').custom(existsCategoryById),
  validateField
], CategoryController.Delete);

export default categoryRouter;
