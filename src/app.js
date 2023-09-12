import express from "express";
import cookieParser from "cookie-parser";
import loginRoutes from "./routes/login.routes.js";
import cors from "cors";

const app = express();
// CORS
const whitelist = [
  "http://127.0.0.1",
  "http://localhost",
  "http://127.0.0.1:4200",
  "http://127.0.0.1:3000",
  "http://localhost:4200",
  "http://localhost:3000",
  "http://login.alejandropb.net",
  "https://login.alejandropb.net",
  "http://api-login.alejandropb.net",
  "https://api-login.alejandropb.net",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de cors"));
    }
  },
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(loginRoutes);

export default app;
