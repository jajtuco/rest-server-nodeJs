import { Request, Response } from 'express';
import * as bcryptjs from 'bcryptjs';
import { Category } from '../models/index';

export class CategoryController {
  static async GetAll(req: Request, res: Response) {
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const resp = await Promise.all([
      Category.countDocuments(),
      Category.countDocuments(query),
      Category.find(query)
        .populate('user', 'name')
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    const [total, actives, categories] = resp;

    res.status(200).json({
      total,
      actives,
      categories
    });
  }

  static async Get(req: Request, res: Response) {

    const { id } = req.params;
    const category = await Category.findById(id)
      .populate('user', 'name');


    res.status(200).json({
      category
    });
  }

  static async Post(req: Request, res: Response) {
    const name = req.body.name.toUpperCase();

    try {
      const categoryDB = await Category.findOne({ name });

      if (categoryDB) {
        return res.status(400).json({
          msg: `The category ${name} already exist`
        });
      }

      // Data to save
      const data = {
        name,
        state: true,
        user: req.body.currentUser._id
      };

      const category = await new Category(data);
      await category.save();

      res.status(201).json({
        category
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

    rest.name = rest.name.toUpperCase();
    rest.user = req.body.currentUser._id;



    const category = await Category.findByIdAndUpdate(id, rest, { new: true });

    res.status(200).json({
      category
    });

  }

  static async Delete(req: Request, res: Response) {

    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, { state: false }, { new: true });
    res.status(200).json({
      category
    });
  }
}
