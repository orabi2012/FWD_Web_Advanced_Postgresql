import express, { json, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import index from './routes/api/index';
import books from './routes/api/book/book.route'

dotenv.config();

const app: express.Application = express();
//const address: string = "0.0.0.0:3000"
const Port = process.env.PORT;
//import client from './database'

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/api', index);
app.use('/api/books', books);

app.listen(Port, function () {
    console.log(`starting app on: ${Port}`);
});

export default app;
