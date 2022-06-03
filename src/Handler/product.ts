import express, { Request, Response } from 'express';
import { product } from '../models/types/product.types';
import { product_store } from '../models/product';

const ps = new product_store();



const index = async (req: Request, res: Response) => {
    const p = await ps.index();
    res.json(p);
};

const create = async (req: Request, res: Response) => {
    const p: product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };

    try {
        const result = await ps.create(p);
        res.json(p);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
    //res.status(200).send(p)
};

const show = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const result = await ps.show(id);
        if (result) {
            res.json(result);
        } else {
            res.json('Not found');
        }
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};


const Delete = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const result = await ps.delete(id);
        if (!result) {
            res.json(result);
        } else {
            res.json('Not found');
        }
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};


const product_routes = (app: express.Application) => {
    app.get('/product', index);
    app.post('/product', create);
    app.get('/product/:id', show);
    app.delete('/product/:id', Delete);
};
export default product_routes;
