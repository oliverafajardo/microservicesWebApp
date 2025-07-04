import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

//not error handling because we want to continue the request if the user is not authenticated
export const currentUser = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    if (!req.session || !req.session.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
        
    }
};