const welcomeRouter = require("../welcome/welcome-router")
const request = require("supertest")

describe("GET/",  ()=> {

    it("works correctly", (res,req) => {
        return request(welcomeRouter).get("/")
        .expect(200)
        .expect(res.body.message).toBe("Welcome to handling users API")
    })


})