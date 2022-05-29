//import express from 'express';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { books_store } from "../../models/book";

const bs = new books_store();

const routes = express.Router();
routes.use(morgan('dev'));

routes.get('/',async function (req: Request, res: Response) {

    //client.connect();
    //const result = await ;
   // const result = await bs.index();
        res.send('ok')
    })
    

export default routes;