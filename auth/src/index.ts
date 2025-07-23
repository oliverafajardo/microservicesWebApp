import mongoose from "mongoose";
import { app } from "./app";

// mongo connection
const start = async () => {

    //check to see if .env is defined
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
    app.listen(3000, () => {
        console.log("Listening on port 3000!!!!!!");
    });
}

start();




