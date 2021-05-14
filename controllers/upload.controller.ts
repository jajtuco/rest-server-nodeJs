import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { FileArray, UploadedFile } from 'express-fileupload';
import { User } from '../models';
import { Product } from '../models/product.model';
import { uploadFile } from '../helpers/uploadFile';

export class UploadController {

  static async uploadFile(req: Request, res: Response) {

    // @ts-ignore
    let file: UploadedFile = req.files.file as UploadedFile;


    uploadFile(file, undefined, 'imgs')
      .then((fileName) => {
        res.status(200).json({ fileName });
      })
      .catch(err => {
        return res.status(400).json({ err });
      });


  }

  static async updateImg(req: Request, res: Response) {

    const { id, collection } = req.params;

    let model;
    switch (collection) {
      case 'user':
        model = await User.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: `There is no user with id ${id}`
          });
        }
        break;
      case 'product':
        model = await Product.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: `There is no product with id ${id}`
          });
        }
        break;
      default:
        return res.status(500).json({ msg: 'Collection not checked' });
    }

    // Clear previous img
    if (model.img) {

      const pathImg = path.join(__dirname, '../uploads', collection, model.img);

      if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
      }
    }


    // @ts-ignore
    let file: UploadedFile = req.files.file as UploadedFile;

    model.img = await uploadFile(file, undefined, collection);
    model.save();

    res.json({
      model
    })


  }

  static async getImg(req: Request, res: Response) {

    const { id, collection } = req.params;

    let model;
    switch (collection) {
      case 'user':
        model = await User.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: `There is no user with id ${id}`
          });
        }
        break;
      case 'product':
        model = await Product.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: `There is no product with id ${id}`
          });
        }
        break;
      default:
        return res.status(500).json({ msg: 'Collection not checked' });
    }

    // Clear previous img
    if (model.img) {

      const pathImg = path.join(__dirname, '../uploads', collection, model.img);

      if (fs.existsSync(pathImg)) {
        return res.sendFile( pathImg );
      }
    }

    const noImgPath = path.join(__dirname, '../assets','no-image.jpg');

    if (fs.existsSync(noImgPath)) {
      return res.sendFile( noImgPath );
    }

    res.status(500).json({
      msg: `There was an error`
    });
  }

}
