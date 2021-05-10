import { Request, Response } from 'express';
import { Types } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { Category, User } from '../models';
import { Product } from '../models/product.model';

class Search {

  static availableCollections: String[] = [
    'user',
    'category',
    'product',
    'roles'
  ];

  static async searchUsers(term: string = "", res: Response) {

    const isMongoID = Types.ObjectId.isValid(term);

    if (isMongoID) {
      const user = await User.findById(term);

      return user ? [user] : []

    }

    const regex = new RegExp(term, 'i');

    const users = await User.find({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ state: true }]
    });

    return users;

  }

  static async searchCategories(term: string = "", res: Response) {

    const isMongoID = Types.ObjectId.isValid(term);

    if (isMongoID) {
      const category = await User.findById(term);

      return category ? [category] : [];

    }

    const regex = new RegExp(term, 'i');

    const category = await Category.find({
      $or: [{ name: regex }],
      $and: [{ state: true }]
    });

    return category;

  }

  static async searchProducts(term: string = "", res: Response) {

    const isMongoID = Types.ObjectId.isValid(term);

    if (isMongoID) {
      const product = await Product.findById(term).populate('category', 'name');

      res.json({
        results: product ? [product] : []
      });
    }

    const regex = new RegExp(term, 'i');

    const product = await Product.find({
      $or: [{ name: regex }],
      $and: [{ state: true }]
    }).populate('category', 'name');

    return product;

  }

}

export class SearchController {



  static async search(req: Request, res: Response) {


    const { collection, term } = req.params;

    if (!Search.availableCollections.includes(collection)) {
      return res.status(400).json({
        msg: `The available collections are ${Search.availableCollections}`
      })
    }

    let data;
    switch (collection.toLowerCase()) {
      case "user":
        data = await Search.searchUsers(term, res);
        break;

      case "category":
        data = await Search.searchCategories(term, res);
        break;
      case "product":
        data = await Search.searchProducts(term, res);
        break;
      default:
        return res.status(500).json({
          ok: false,
          msg: `The available collections are ${Search.availableCollections}`
        });
    }
    return res.json({
      ok: true,
      [collection]: data
    });

  }

  static async searchAllByName(req: Request, res: Response) {

    const term = req.params.term;
    const regex = new RegExp(term, 'i');

    const [users, products, categories] = await Promise.all([

        User.find({ name: regex }),

        Product.find({ name: regex }),

        Category.find({ name: regex })
    ]);

    return res.json({
        ok: true,
        users,
        products,
        categories

    });

}
}
