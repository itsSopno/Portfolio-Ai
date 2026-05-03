import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db';
import routes from './routes';
import { testAi } from './Gemini/gemini';

dotenv.config();

// Connect to MongoDB
connectDB();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api', routes);

// Base route
app.get('/', (req: Request, res: Response) => {
  res.send('Portfolio AI Backend is running!');
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

testAi();
