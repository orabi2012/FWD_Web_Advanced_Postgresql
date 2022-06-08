import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import product_routes from './Handler/product';
import user_routes from './Handler/user';
import { PORT } from './configuration';

dotenv.config();

const app: express.Application = express();
//const address: string = "0.0.0.0:3000"
//const PORT = process.env.PORT;
//import client from './database'

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

product_routes(app);
user_routes(app);

app.get('/', (_req, res) => {
  res.status(200).send(`Application Home Page : PORT = ${PORT}`);
});
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Page Not Found' });
});

app.listen(PORT, function () {
  console.log(`starting app on: ${PORT}`);
});

export default app;
