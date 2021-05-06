import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const isAdminRole = (req: Request, res: Response, next: NextFunction) => {
  // req.body.currentUser was added in validateJWT.middleware
  if (!req.body.currentUser) {
    return res.status(500).json({
      errors: 'Must validate a token'
    });
  }

  const { role, name } = req.body.currentUser;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      errors: `${name} is not an ADMIN`
    });
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    });
  }

  next();
};


export const containRoles = (...roles: string[] ) => {

  return (req: Request, res: Response, next: NextFunction) => {

    // req.body.currentUser was added in validateJWT.middleware
    if (!req.body.currentUser) {
      return res.status(500).json({
        errors: 'Must validate a token'
      });
    }

    if( !roles.includes(req.body.currentUser.role) ){
      return res.status(401).json({
        errors: `Invalid Role: needs one of ${roles}`
      });
    }

    next();
  }
};
