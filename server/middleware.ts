import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface UserPayload {
  id: number;
  role: string;
  iat?: number;
  exp?: number;
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const authenticateToken = (requiredRole: string | null = null) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      console.log('Auth failed: No token provided');
      return res.status(401).json({ success: false, error: 'Access token not found' });
    }

    try {
      const user = jwt.verify(token, JWT_SECRET) as UserPayload;
      
      // Check if token has expired
      if (user.exp && user.exp < Math.floor(Date.now() / 1000)) {
        console.log('Auth failed: Token expired');
        return res.status(401).json({ success: false, error: 'Token expired' });
      }
      
      // Check role if required
      if (requiredRole && user.role !== requiredRole) {
        console.log(`Auth failed: Insufficient permissions - User role: ${user.role}, Required: ${requiredRole}`);
        return res.status(403).json({ success: false, error: 'Insufficient permissions' });
      }

      req.user = user;
      next();
    } catch (err) {
      console.log('Auth failed: Invalid token', err);
      return res.status(403).json({ success: false, error: 'Invalid token' });
    }
  };
};

export { authenticateToken };
