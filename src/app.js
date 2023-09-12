import express from 'express';
import cookieParser from 'cookie-parser';
import loginRoutes from './routes/login.routes.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(loginRoutes);

export default app;