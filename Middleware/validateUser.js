const jwt = require("jsonwebtoken");

class ValidateUser{

     validateEmailAndPassword(req,res,next){

        const {email,password,type} = req.body;

        if(!email || !password || !type){
            res.status(400).send({message:"All fields are required!"});
            return;
        }
        next();
    }

    validateNameEmailPassword(req,res,next){

        const {name,email,password,type} = req.body;

        if(!name || !email || !password || !type){
            res.status(400).send({message:"All fields are required!"});
            return;
        }
        next();
    }

    validateCustomerType(req,res,next){

      const {type} = req.body;

      if(!type){
          res.status(400).send({message:"User type is required!"});
          return;
      }
      next();
  }

    validateToken(req,res,next){
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            jwt.verify(token, process.env.SALT, (err, decoded) => {
              // console.log("decode",decoded);
              if (err) {
                res.json({
                  success: 0,
                  message: "Invalid token",
                });
              } else {
                next();
              }
            });
          } else {
            res.json({
              success: 0,
              message: "Access denied! unauthorised user",
            });
          }

    }

}

module.exports = new ValidateUser();