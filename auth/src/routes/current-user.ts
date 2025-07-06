import express from "express";
import jwt from "jsonwebtoken";
import cookieSession from "cookie-session";
import { currentUser } from "../middlewares/current-user";

const router = express.Router();


router.get("/api/users/currentuser", currentUser, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
// exporting the router since we will have many routers in our app