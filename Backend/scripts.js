// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { userRouter } from './src/userRoute/User.js';

dotenv.config();

const __dirname = path.resolve(); // Define __dirname manually for ES modules

// ... (existing imports)

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Serve the React app for all 
// app.use(express.static(path.join(__dirname, 'Client', 'build')));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'Client', 'build', 'index.html')); // Adjust path accordingly
// });
app.use('/api', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





