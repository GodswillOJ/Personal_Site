// middleware/authenticateToken.js

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_Phrase = process.env.JWT;

export const isAuthenticated = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' }); // No token provided
  }

  // Verify the token
  jwt.verify(token, JWT_Phrase, (err, decodedToken) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(401).json({ error: 'Unauthorized' }); // Token verification failed
    }
    
    // Token is valid, attach the decoded token to the request object
    req.user = decodedToken;
    next(); // Proceed to the next middleware
  });
};
