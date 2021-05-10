/*
    Ruta: /api/product
*/

import { Router } from 'express';
import { check } from 'express-validator';
import { isValidRole, existsEmail, existsUserById, existsCategoryById, existsProductById } from '../helpers/db-validators';

// Middlewares
import { isAdminRole, containRoles, validateJWT, validateField } from '../middlewares/index';

import { ProductController } from '../controllers/product.controller';

const productRouter = Router();

productRouter.get('/', ProductController.GetAll);

productRouter.get('/:id', [
  check('id', 'The id is not valid').isMongoId(),
  check('id').custom(existsProductById),
  validateField
], ProductController.Get);

productRouter.post('/', [
  validateJWT,
  check('name', 'The name is required').not().isEmpty(),
  check('category', 'The categoryId is no valid').isMongoId(),
  check('category').custom(existsCategoryById),
  validateField
], ProductController.Post);

productRouter.put('/:id', [
  validateJWT,
  check('category', 'The categoryId is no valid').isMongoId(),
  check('id').custom(existsProductById),
  validateField
], ProductController.Put);

productRouter.delete('/:id', [
  validateJWT,
  isAdminRole,
  check('id', 'The id is not valid').isMongoId(),
  check('id').custom(existsProductById),
  validateField
], ProductController.Delete);

export default productRouter;
