/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {

    try{
      // the JWT is being sent automatically from the cookie jar,
			// so this uses the cookie-parser middleware to get the value.(therefore make sure you install cookie-parser and call it in your index.js or server.js file)
      const {token} = req.cookies
    if (!token) {
      res.status(401).json({ you: 'shall not pass!' });
    }
    
    jwt.verify(token, process.eventNames.JTW_SECRET, (error, decoded) => {
      if (error){
        res.status(401).json({ you: 'shall not pass!' });
      }

      req.token = decoded
      console.log(decoded)


      next()
 

    })

    } catch(error){
      next(error)
    }

  
};
