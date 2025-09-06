import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import booksRoute from './routes/booksRoute.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/books', booksRoute);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to MERN Backend');
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err.message);
    console.log('Server will start without database connection for testing purposes');
  });

// Start server regardless of database connection
app.listen(5555, () => {
  console.log('Server is running on port 5555');
  console.log(`MongoDB URI in use: ${MONGODB_URI}`);
});

export default app;
