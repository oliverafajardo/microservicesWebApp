import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@sgtickets510/common";
import { Password } from "../services/password";
import { User } from "../models/user";

const router = express.Router();

router.post("/api/users/signin",
    [
        body('email')
        .isEmail()
        .withMessage('Email must be valid'),
        body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
    ],
    validateRequest as any,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }

        //compare the password asynchronously
        const passwordsMatch = await Password.compare(
            existingUser.password, 
            password
        );
        
        if (!passwordsMatch) {
            throw new BadRequestError('Invalid credentials');
        }

        //generate jwt
        const userJwt = jwt.sign(
            {
            id: existingUser.id,
                email: existingUser.email
            }, 
            process.env.JWT_KEY!
        );

        //store it on session object
        req.session = {
            jwt: userJwt
        };

        res.status(200).send(existingUser);
    }
);

export { router as signinRouter };
// exporting the router since we will have many routers in our app