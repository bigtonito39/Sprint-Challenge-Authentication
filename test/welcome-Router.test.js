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

test("create user", async () => {
  
   const res = await supertest(server)
   .post("/api/auth/register")
   .send({ username: "JoseR4", password: "Mets" })
   expect(res.statusCode).toBe(201)
   expect(res.type).toBe("application/json")
   expect(res.body.username).toBe("JoseR4")

})

test("login user", async () => {

   const res = await supertest(server)
   .post("/api/auth/login")
   .send({ username: "Enoka", password: "TL" })
       expect(res.statusCode).toBe(200)

})