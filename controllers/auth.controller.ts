import { Request, Response } from 'express';
import * as bcryptjs from 'bcryptjs';
import { User } from '../models/user.model';
import { generateJWT } from '../helpers/generateJWT';
import { googleVerify } from '../helpers/google-verify';

export default class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      // Check the email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          msg: 'The user is incorrect'
        });
      }
      // Check if the user is active
      if (!user.state) {
        return res.status(400).json({
          msg: 'Invalid user'
        });
      }
      // Check password
      const validPassword = bcryptjs.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({
          msg: 'The password is incorrect'
        });
      }
      // Generate JWT
      const token = await generateJWT(user.id);

      res.json({
        ok: true,
        user,
        token
      });
    } catch (error) {
      res.status(500).json({
        error
      });
    }
  }

  static async googleSignIn(req: Request, res: Response) {
    try {
      const { id_token } = req.body;

      const { name, email, picture: img } = await googleVerify(id_token);

      let user = await User.findOne({ email });
console.log("User", user);

      if (!user) {
        user = new User({
          password: '@@@',
          name,
          email,
          img,
          google: true
        });

        await user.save();
      }

      // Check if the user is active
      if (!user.state) {
        return res.status(401).json({
          msg: 'Invalid user'
        });
      }

      // 3 - Genearte TOKEN
      const token = await generateJWT(user.id);

      res.json({
        user,
        token
      });
    } catch (error) {
      res.status(401).json({
        ok: false,
        msg: error
      });
    }
  }

  static async renewToken(req: Request, res: Response) {}
}
