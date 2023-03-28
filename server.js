import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';


import Connection from './database/db.js';
import Router from './routes/route.js'


const app = express();
app.use(cors());

dotenv.config();


app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', Router);



const PORT = process.env.PORT || 8000;


const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const URL = process.env.DATABASE || `mongodb+srv://${username}:${password}@cluster0.aor8a.mongodb.net/?retryWrites=true&w=majority`;

Connection(URL);

app.listen(PORT, () => {
    console.log(`Server is running successfully on PORT ${PORT}`);
})