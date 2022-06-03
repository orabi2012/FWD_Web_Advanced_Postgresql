import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import product_routes from './Handler/product'

dotenv.config();

const app: express.Application = express();
//const address: string = "0.0.0.0:3000"
const Port = process.env.PORT;
//import client from './database'

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());



app.get('/' , (_req,res)=>{

    res.status(200).send(`<h3>Application Home Page : Port = ${Port} <h3/>`)
} )

product_routes(app);
app.listen(Port, function () {
    console.log(`starting app on: ${Port}`);
});

export default app;
