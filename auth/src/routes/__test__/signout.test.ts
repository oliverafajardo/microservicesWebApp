import request from "supertest";
import { app } from "../../app";

it("clears the cookie after signing out", async () => {
    //sign up first
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201);

    //sign out
    const response = await request(app)
        .post("/api/users/signout")
        .send({})
        .expect(200);

    const cookie = response.get("Set-Cookie");
    expect(cookie).toBeDefined();
    if (!cookie) {
        throw new Error("Expected Set-Cookie header but got undefined.");
    }
    expect(cookie[0]).toContain("session=;");
    expect(cookie[0]).toContain("expires=Thu, 01 Jan 1970 00:00:00 GMT");
});