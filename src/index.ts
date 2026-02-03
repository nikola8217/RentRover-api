import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/MongoDB';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

const port = process.env.PORT;

const start = async () => {
    const dbConnectionString = process.env.MONGO_URI;

    if (!dbConnectionString) {
        console.log("MONGO_URI is not defined in the environment.");
        return;
    }

    console.log("Connected to Mongo Database");

    try {
        await connectDB(dbConnectionString);
        
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error(error);
    }
};

start();