import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { AuthRequest } from '../custom';

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication requerida' });
    }

    try {
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'JWT secret no definido' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as unknown as { id: string };
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User no encontrado' });
        }

        req.user = user as AuthRequest['user'];

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
