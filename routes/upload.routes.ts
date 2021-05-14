/*
    Ruta: /api/search
*/

import { Router } from 'express';
import { check } from 'express-validator';
import { UploadController } from '../controllers/upload.controller';
import { availablesCollections } from '../helpers';
import { validateField, validateFile } from '../middlewares';

const uploadRouter = Router();

uploadRouter.post('/', validateFile, UploadController.uploadFile);
uploadRouter.put('/:collection/:id', [
  validateFile,
  check('id', 'The id must be valid').isMongoId(),
  check('collection').custom( c => availablesCollections(c, ['user','product'])),
  validateField
], UploadController.updateImg);
uploadRouter.get('/:collection/:id', [
  check('id', 'The id must be valid').isMongoId(),
  check('collection').custom( c => availablesCollections(c, ['user','product'])),
  validateField
], UploadController.getImg);


export default uploadRouter;
