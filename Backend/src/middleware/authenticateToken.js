// authMiddleware.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_Phrase = process.env.JWT;

export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, JWT_Phrase, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });

    req.user = user;
    next();
  });
};
