import express, { Request, Response } from "express";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@sgtickets510/common";
import type { ErrorRequestHandler } from 'express';
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";


const app = express();

app.set('trust proxy', true); //traffic is proxied through nginx, make sure express knows that it is secure from nginx

app.use(express.json());

app.use(cookieSession({
    name: 'session', // Match the actual cookie name being set
    signed: false, //do not encrypt the cookie
    secure: process.env.NODE_ENV !== 'test' //only use secure in production
}));

// Type assertion needed due to Express version conflicts between packages
app.use(currentUser as unknown as express.RequestHandler);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

// Catch-all route for unmatched paths - using Express 5.x wildcard pattern
app.all('{*splat}', async (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler as unknown as ErrorRequestHandler);


export { app };