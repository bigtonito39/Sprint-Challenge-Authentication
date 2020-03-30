const bcrypt = require ("bcryptjs")
const db = require("../database/dbConfig")

function find(){
    return db("users")
    .select("id", "username")
}


function findBy(filter){
    return db("users")
    .select("id", "username", "password")
    .where(filter)
}


function findById(id){
    return db("users")
    .select("id", "username")
    .where({id})
    .first()
}

async function add (user){
    //here it will assing a hashed(codified password) password to hide in the code base so that hackers dont steal it :). 
    user.password = await bcrypt.hash(user.password, 14)

    //here im destructuring this funtion, therefore im really saying something like users.id =   ..... to the send it to findById funtion
    const [id] = await db("users")
    .insert(user)
    return findById(id)
}

async function update(id, changes) {
    await db("users").update(changes)
    .where("id", id)
    return findById(id)
}

function remove(id){
    return db("users")
    .where("id", id)
    .del()
}

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove
}