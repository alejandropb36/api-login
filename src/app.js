import express from 'express';
import loginRoutes from './routes/login.routes.js';

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use(loginRoutes);

export default app;