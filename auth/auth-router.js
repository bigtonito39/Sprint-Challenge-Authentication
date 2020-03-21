const router = require('express').Router();
const bcrypt = require("bcryptjs");
const usersModel = require("../users/users-model")

router.post('/register', async (req, res, next) => {
  // implement registration
  try{
    const {username} = req.body

    const user = await usersModel.findBy({username})
    .first()
 
    if(user) {
      return res.status(409).json({
        message:"Username is already taken"
      })
    }
    else{
      res.status(201).json(await usersModel.add(req.body))

    }
    
  }catch(err){
    next(err)
  }
});

router.post('/login', async (req, res, next) => {
  // implement login

   const authError = {
  message: "Invalid Credentials",
   }

         try {

         const {username, password} = req.body

         const user = await usersModel.findBy({username}).first()

         if(!user){
         return res.status(401).json(authError)
           }
                    //here is comparing the username coming from the input vs the one hashed in the database if equeal it will return true, false if not equal
         const passwordValid = await bcrypt.compare(password, user.password)
         if(!passwordValid){
         return res.status(401).json(authError)
          }
         else{

         // This data gets encoded into our JWT for use in later requests
          const payload = {
            userID: user.id,
            userRole:"admin", // this would normally come from a database
          }
          // You can use this to expire cookie in 8 hours
          const options = {
            expiresIn: "8h"
          }
           // generate a new JWT and cryptographically sign
          const token = jwt.sign(payload, process.env.JWT_SECRET,options )

           // sends a Set-Cookie header with the value of the token
          res.cookie("token", token)

          res.json({                               //please token here if you want to make sure token went through
            message: `Welcome ${user.username}!`,  token
          })
         }
          

}catch (error){
  next(error)
}

});

module.exports = router;
