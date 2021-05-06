import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  // Read the Token
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      errors: 'There is no token'
    });
  }

  try {
    const obj: { uid: number; iat: number; exp: string } = Object(jwt.verify(token, String(process.env.JWT_SECRET)));

    // Read authenticated user
    const user = await User.findById(obj.uid);

    // Check if there is an user
    if (!user) {
      return res.status(401).json({
        msg: 'Invalid Token - User state not exists'
      });
    }

    // Check if the user is active
    if (!user.state) {
      return res.status(401).json({
        msg: 'Invalid Token - User state false'
      });
    }

    req.body.currentUser = user; // To send the user's uid whose made the request

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      errors: 'Invalid Token'
    });
  }
};
