import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
    res.send("Hi there");
});

export { router as currentUserRouter };
// exporting the router since we will have many routers in our app