import { Post, User } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_Phrase = process.env.JWT;

export const insertUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input fields
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  const user = await User.findOne({ username });

  if (user) {
    return res.status(400).json({ error: 'User already exist in site' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword, is_admin: 0 });

  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const LoginVerify = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Received login request for username:', username);

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found:', username);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('Invalid password for user:', username);
      return res.status(401).json({ error: 'Invalid credentials password or username' });
    }

    // Generate JWT token
    if (user.is_admin === 0) {
      const token = jwt.sign({ userId: user._id }, JWT_Phrase, { expiresIn: '1d' }); // set to 1 day
      
      res.json({ access_token: token, userID: user._id });
    } else {
      // Change the status to 401 for consistency with the frontend
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const Home = async (req, res) => {
  try {
    // Check if the user is logged in
    if (req.user) {
      // Fetch user data here
      const userData = await User.findById(req.user.userId); // Assuming you have a User model
      res.json({ message: 'Welcome home!', userData });
    } else {
      res.json({ message: 'Welcome home!' }); // For unauthorized users
    }
  } catch (error) {
    console.error('Error loading home page:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to fetch user data for the dashboard
export const fetchUserData = async (req, res) => {
  try {
    // Fetch user data
    const userData = await User.findById(req.user.userId); // Assuming you have a User model
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data for dashboard:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

