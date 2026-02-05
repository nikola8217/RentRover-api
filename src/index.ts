import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/MongoDB';
import { userRouter } from './modules/users-module/routes/UserRoutes';
import { authRouter } from './modules/auth-module/routes/AuthRoutes';
import { categoryRouter } from './modules/categories-module/routes/CategoryRoutes';
import { brandRouter } from './modules/brands-module/routes/BrandRoutes';
import { errorHandler } from './shared/middlewares/ErrorHandler';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/brands', brandRouter);

app.use(errorHandler);

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