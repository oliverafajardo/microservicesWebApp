import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/user";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.post("/api/users/signup", [
    body('email')
    .isEmail()
    .withMessage('email must be valid'),
    body('password')
    .trim()
    .isLength({min: 4, max: 20})
    .withMessage('password must be between 4 and 20 characters')
], 
async (req: Request, res: Response) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save(); //save the user to the database

    res.status(201).send(user); //send the user to the client
});

export { router as signupRouter };
// exporting the router since we will have many routers in our app

