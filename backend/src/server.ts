import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { errorHandler } from './middlewares/errorHandler';
import passport from 'passport';
import { configurePassport } from './middlewares/authMiddleware';
import authRoutes from './routes/authRoutes';
import tripRoutes from './routes/tripRoutes';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(passport.initialize());
configurePassport();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start(); 