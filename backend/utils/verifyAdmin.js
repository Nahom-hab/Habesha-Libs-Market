import jwt from 'jsonwebtoken';
import { errorHandeler } from './ErrorHandler.js';

export const verifyAdmin = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandeler(401, 'Unauthorized'));

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) return next(errorHandeler(403, 'Forbidden'));
        req.user = user;
        next();
    });
};
