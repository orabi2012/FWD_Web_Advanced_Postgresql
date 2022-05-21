import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import * as dotenv from 'dotenv';

dotenv.config();

const app: express.Application = express()
//const address: string = "0.0.0.0:3000"
const Port = process.env.PORT

app.use(bodyParser.json())
app.use(morgan('dev'))

app.get('/', function (req: Request, res: Response) {

    let dateTime = new Date()


    res.send(`starting app on: ${Port} ${dateTime}`)
})

app.listen(Port, function () {
    console.log(`starting app on: ${Port}`)
})


export default app