import express, { Request, Response } from "express";
import 'express-async-errors';
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@sgtickets510/common";
import type { ErrorRequestHandler } from 'express';


const app = express();

app.set('trust proxy', true); //traffic is proxied through nginx, make sure express knows that it is secure from nginx

app.use(cookieSession({
    signed: false, //do not encrypt the cookie
    secure: process.env.NODE_ENV !== 'test' //only use secure in production
}));


app.all('*', async (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler as unknown as ErrorRequestHandler);


export { app };