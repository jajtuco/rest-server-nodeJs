import { Request, Response } from 'express';
import * as bcryptjs from 'bcryptjs';
import { Product } from '../models/index';

export class ProductController {
  static async GetAll(req: Request, res: Response) {
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const resp = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments(query),
      Product.find(query)
        .populate('user', 'name')
        .populate('category', 'name')
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    const [total, actives, products] = resp;

    res.status(200).json({
      total,
      actives,
      products
    });
  }

  static async Get(req: Request, res: Response) {

    const { id } = req.params;
    const product = await Product.findById(id)
      .populate('user', 'name')
      .populate('category', 'name');


    res.status(200).json({
      product
    });
  }

  static async Post(req: Request, res: Response) {
    const { state, user, name, ...body } = req.body;

    try {
      const productDB = await Product.findOne({ name });

      if (productDB) {
        return res.status(400).json({
          msg: `The product ${name} already exists`
        });
      }

      // Data to save
      const data = {
        ...body,
        name: name.toUpperCase(),
        state: true,
        user: req.body.currentUser._id
      };

      const product = await new Product(data);
      await product.save();

      res.status(201).json({
        product
      });
    } catch (error) {
      return res.status(500).json({
        error
      });
    }
  }

  static async Put(req: Request, res: Response) {

    const { id } = req.params;
    const { _id, user, ...rest } = req.body;

    if( rest.name ){
      rest.name = rest.name.toUpperCase();
    }
    rest.user = req.body.currentUser._id;

    const product = await Product.findByIdAndUpdate(id, rest, { new: true });

    res.status(200).json({
      product
    });

  }

  static async Delete(req: Request, res: Response) {

    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, { state: false }, { new: true });
    res.status(200).json({
      product
    });
  }
}
