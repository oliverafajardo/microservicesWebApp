import express from "express";

const router = express.Router();

router.post("/api/users/signin", (req, res) => {
    res.send("Hi there");
});

export { router as signinRouter };
// exporting the router since we will have many routers in our app