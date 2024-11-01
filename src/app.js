import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.router.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Create __filename and __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "../multi_pages_form/dist")));

app.use('/api/v1/user', userRouter);

app.get("*", (_, res) =>
  res.sendFile(path.join(__dirname, "../multi_pages_form/dist/index.html"))
);

export { app };