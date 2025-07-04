import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
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
validateRequest, //added before because we want to validate the request before we save the user to the database
async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save(); //save the user to the database


    //generate jwt 
    const userJwt = jwt.sign({
        //payload
        id: user.id, 
        email: user.email
    }, 
    process.env.JWT_KEY!
    ); 

    //store it on session object
    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user); //send the user to the client
});

export { router as signupRouter };
// exporting the router since we will have many routers in our app

