import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
import errorHandler from './middleware/error';

// Route files
import auth from './routes/v1/auth';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app: Express = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security headers
app.use(helmet());

// Enable CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Frontend URL
    credentials: true
}));

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to City School API (v1)' });
});

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});


// Mount routers
app.use('/api/v1/auth', auth);

// Use error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: any, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
