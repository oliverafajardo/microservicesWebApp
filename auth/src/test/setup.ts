import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";


//before test start up will create a new instance of the mongo server
//before each test will connect to the mongo server
//after each test will close the connection to the mongo server
//after all tests will stop the mongo server

let mongo: any;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    process.env.JWT_KEY = "asdf";
    if (mongoose.connection.db) {
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            await collection.deleteMany({});
        }
    }
});

afterAll(async () => {
    if (mongo) {    
        await mongo.stop();
    }
    await mongoose.connection.close();
});