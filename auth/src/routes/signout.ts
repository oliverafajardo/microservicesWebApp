import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
    req.session = null;
    res.send({})
});

export { router as signoutRouter };
// exporting the router since we will have many routers in our app