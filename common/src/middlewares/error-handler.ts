import { Request, Response, NextFunction } from "express"; 
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {

    //handle custom errors
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    //if the error is not a custom error, send a generic error
    console.log(err);
    res.status(400).send({
        errors: [{message: 'Something went wrong'}]
    });
};


