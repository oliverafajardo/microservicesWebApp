import express from "express";
import 'express-async-errors';
import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";


import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { errorHandler, NotFoundError } from "@sgtickets510/common";
import type { ErrorRequestHandler } from 'express';


const app = express();

app.set('trust proxy', true); //traffic is proxied through nginx, make sure express knows that it is secure from nginx

app.use(cookieSession({
    signed: false, //do not encrypt the cookie
    secure: process.env.NODE_ENV !== 'test' //only use secure in production
}));

app.use(bodyParser.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler as unknown as ErrorRequestHandler);


export { app };