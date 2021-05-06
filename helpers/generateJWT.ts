import * as jwt from 'jsonwebtoken';

export const generateJWT = (uid: string) => {
  //

  return new Promise((resolve, reject) => {
    const payload = {
      uid
    };

    jwt.sign(
      payload,
      String(process.env.JWT_SECRET),
      {
        expiresIn: '4h'
      },
      (err, token) => {
        if (err) {
          reject(err);
        }

        resolve(token);
      }
    );
  });
};
