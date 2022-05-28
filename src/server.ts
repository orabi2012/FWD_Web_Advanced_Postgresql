import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import * as dotenv from 'dotenv';
import { books_store } from "./models/book";

const bs = new books_store;
dotenv.config();

const app: express.Application = express()
//const address: string = "0.0.0.0:3000"
const Port = process.env.PORT
import client from './database'

app.use(bodyParser.json())
app.use(morgan('dev'))

app.get('/',async function (req: Request, res: Response) {

//client.connect();
//const result = await ;
    res.send(`starting app on: ${Port} ${bs.index()}`)
})


app.listen(Port, function () {
    console.log(`starting app on: ${Port}`)
})


export default app