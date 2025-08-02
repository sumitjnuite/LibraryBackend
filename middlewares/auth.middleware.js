import jwt from 'jsonwebtoken';

// JWT middleware
export const authMiddleware = (req, res, next) => {
  // Check for token in the Authorization header (Bearer token)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    // req.user = user;
    next();
  });
};