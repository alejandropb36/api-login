import express from "express";
import cookieParser from "cookie-parser";
import loginRoutes from "./routes/login.routes.js";
import cors from "cors";

const app = express();
// CORS
app.use(cors({credentials: true}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(loginRoutes);

export default app;
