const UserModal = require("../Modal/User");
const jwt = require("jsonwebtoken");

class UserAuthController{

    async registerUser(req,res){
        const {name,email,password,type} = req.body;
        try{
    
            const newUser = await UserModal.create({
                name,email,password,type
            });
    
            res.status(200).send({message:"User registration success!!",newUser});
            return;
        
        }catch(e){
            console.log(e);
            res.status(500).send({message:"Failed User Registration"});
            return;
        }
    }

    async loginUser(req,res){
        
        const {email,password,type} = req.body;
        try{
    
            let userInfo = await UserModal.findOne({email,password,type});
            if(userInfo){
                const access_token =  jwt.sign({_id:userInfo._id},process.env.SALT,{
                    expiresIn:"24h"
                });
                // userInfo.access_token=access_token;
                // userInfo = await userInfo.save();

                res.status(200).send({message:"login success!!",userInfo,access_token});
                return;
            }else{
                res.status(400).send({message:"Unauthorized user!!"});
                return;
            }
           
    
        }catch(error){
            console.log("error",error);
            res.status(500).send({message:"try again later!"});
            return;
        }
    }

    

}

module.exports = new UserAuthController();