import express from 'express';
import { configDotenv } from "dotenv";
import cookieParser from 'cookie-parser';
import { connectDB } from "./config/database.js";

import authRoutes from "./routes/auth.routes.js";

const app = express();

// Using Configuration functions
configDotenv();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// Starting server
app.listen(process.env.PORT, () => {
   console.log('Listening on port 3000');
});