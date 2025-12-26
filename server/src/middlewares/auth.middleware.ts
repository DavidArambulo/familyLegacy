import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../model/m_user";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: IUser;
}

export const protect = expressAsyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

            req.user = await User.findById(decoded.id).select('-password') as IUser;

            next();
        } catch(err) {
            res.status(401);
            throw new Error('No autorizado, falló el token')
        }
    }
    
    if (!token) {
        res.status(401);
        throw new Error('No autorizado, no hay token')
    }
})