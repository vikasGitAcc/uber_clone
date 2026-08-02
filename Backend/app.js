import express from 'express';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDB } from './components/database/MongoBD.js';
import userRoutes from '../Backend/components/routes/user.route.js';
import cookieParser from 'cookie-parser';
import captainRoutes from './components/routes/captain.routes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const _dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(_dirname, 'index.html');

app.get('/', (req, res) => {
    res.sendFile(filePath);
});

app.use('/users', userRoutes);
app.use('/captain', captainRoutes);

app.use((err, req, res, next) => {
    return res.status(500).json({
        success: false,
        message: err.message,
        errors: err.errors || [],
    });
});


const start_server = async () => {
    try{
        await connectToDB();
        const port = process.env.PORT || 3000;
        server.listen(port, '0.0.0.0', (req, res) => {
        console.log(`Server is listening on port: ${port}`);
});

    }catch(err){
        console.error("Error starting server:", err);
        process.exit(1); // Exit the process with an error code
    }
}

start_server();

