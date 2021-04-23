import { Request, Response } from 'express';

export class UsersController {


    static async Get(req: Request, res: Response) {
        
        const { a, b} = req.query;

    
        res.status(200).json({
            "msg": "get API",
            a,
            b
        });
    }


    static async Put(req: Request, res: Response) {

        const id = req.params.id;
    
        res.status(200).json({
            "msg": "put API",
            id
        });
    }

    static async Post(req: Request, res: Response) {

        const body = req.body;

        res.status(200).json({
            "msg": "post API",
            body
        });
    }

    static async Delete(req: Request, res: Response) {
        res.status(200).json({
            "msg": "delete API"
        });
    }
}