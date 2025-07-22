import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

//this is a type that we will use to add the user to the request object
interface UserPayload {
    id: string;
    email: string;
}

//this is how we can reach into existing type definition.
//find interface of request and add property currentUser qne the type will be UserPayload
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload; 
        }
    }
}

//steps:
//check is user is loggedin, if not continue, user will be undefined, if user has jwt, extract the it.
export const currentUser = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => { //if no session object, or jwt is not present, then we want to continue the request
    if (!req.session?.jwt) {
        return next();
    }
    try { //if the jwt is valid, then we want to add the user to the request object
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
        next();
    } catch (err) { //if the jwt is invalid, then we want to continue the request
        return next();
    }
};



//benefit if this middleware
// anytime we need to check if user is loggedin, we can just use this middleware