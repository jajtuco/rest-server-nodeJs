import { Request, Response } from 'express';
import { User } from '../models/index';
import * as bcryptjs from 'bcryptjs';

export class UsersController {
  static async Get(req: Request, res: Response) {
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const resp = await Promise.all([
      User.countDocuments(),
      User.countDocuments(query),
      User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    const [total, actives, users] = resp;

    res.status(200).json({
      total,
      actives,
      users
    });
  }

  static async Put(req: Request, res: Response) {
    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if (password) {
      // Encrypt password
      const salt = bcryptjs.genSaltSync();
      rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.status(200).json({
      user
    });
  }

  static async Post(req: Request, res: Response) {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Save
    await user.save();

    res.status(200).json({
      msg: 'post API',
      user
    });
  }

  static async Delete(req: Request, res: Response) {
    const { id } = req.params;
    const currentUser = req.body.currentUser; // This was added in validateJWT.middleware

    //Physically delete
    // const user = await User.findByIdAndDelete(id);

    // Logic delete
    const user = await User.findByIdAndUpdate(id, { state: false }, { new: true });

    res.status(200).json({
      user,
      currentUser
    });
  }
}
