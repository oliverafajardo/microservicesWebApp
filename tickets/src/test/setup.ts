import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
import jwt from "jsonwebtoken";


//before test start up will create a new instance of the mongo server
//before each test will connect to the mongo server
//after each test will close the connection to the mongo server
//after all tests will stop the mongo server

declare global {
    var signin: () => Promise<string[]>;
}

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

global.signin = async () => {
   //build a jwt payload {id, email}
   const payload = {
    id: 'dhdjffkfdj ',
    email: 'test@test.com'
   }
   //create the jwt
   const token = jwt.sign(payload, process.env.JWT_KEY!)

   //build session object {jwt: MY_JWT}
   const session = { jwt: token }
   
   //turn that session into JSON
   const sessionJSON = JSON.stringify(session)


   //take JSON and encode it as base64
   const base64 = Buffer.from(sessionJSON).toString('base64')

   //return the string
   return [`express:sess=${base64}`]

};