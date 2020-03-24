const server = require("../api/server")
const supertest = require("supertest")

test("welcome route", async ()=> {

   const res = await supertest(server).get("/")
   expect(res.statusCode).toBe(200)
   expect(res.type).toBe("application/json")
   expect(res.body.message).toBe("Welcome to handling users API")
   expect(res.body.message).toHaveLength(29)
   expect(res.body.message).toMatch(/Welcome/i)
   
})