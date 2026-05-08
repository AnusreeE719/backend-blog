import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import feedRoutes from './routes/feedRoutes.js';

const app = express();
app.use(express.json());
app.use(cookieParser());


dotenv.config();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/posts", blogRoutes);
// app.use("/api/feeds", feedRoutes); //public

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to nodejs blog project');
})

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});