/*
    Ruta: /api/users
*/

import { Router } from 'express';
import { UsersController } from '../controllers/users.controllers';


const usersRouter = Router();

usersRouter.get('/', UsersController.Get);

usersRouter.put('/:id', UsersController.Put);

usersRouter.post('/', UsersController.Post);

usersRouter.delete('/', UsersController.Delete);

export default usersRouter;