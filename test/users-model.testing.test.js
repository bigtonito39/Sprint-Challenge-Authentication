const usersModels = require("../users/users-model")
const db = require("../database/dbConfig")
/*//This would have to be done if you had seeds
beforeEach(async () => {
   await db.seed.run()
})*/


//Testing models directly

/*test("add", async () => {
    const res = await usersModels.add({username: "JoseTest" , password: "Mets19"})
    expect(res.username).toBe("JoseTest")
})*/

test("findById", async () => {
    const res = await usersModels.findById(1)
    expect(res.username).toBe("Enoka")
})

test("update", async () => {
    const res = await usersModels.update(2, {username:"Ejaona"})
    expect(res.username).toBe("Ejaona")
})

test("remove", async () => {
    await usersModels.remove(3)
    const users = await db("users").select()
    //expect users 
    expect(users).toHaveLength(2)
})