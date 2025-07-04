import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

//assume we will never use require-auth middleware without previosuly running the current user middleware
//by the time request comes in require auth, should have check if jwt is present, decoded and already set on req.current user property, if it isnt we need to reject it..

export const requireAuth = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    if (!req.currentUser) {
        throw new NotAuthorizedError();
    }
    next();
};