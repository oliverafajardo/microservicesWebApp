import { Request, Response, NextFunction } from "express"; //importing the types for the request, response and next function
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

//middleware to validate the request
export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
     }
     next();
}
 