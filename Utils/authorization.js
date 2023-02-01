const jwt = require("jsonwebtoken")
const adminModel = require("../Models/adminModel")
const dotenv = require("dotenv");
dotenv.config({path: "./config/config.env"});

const isSignIn = async (req,res,next)=>{
    const userid = req.params.userid
    const user = await adminModel.findById(userid);

    const authToken = user.token;
    if(!authToken){
        res.status(401).json({
            message: "Not authorized"
        });
    }
    jwt.verify(authToken, process.env.JWT_TOKEN, (err,payload)=>{
        if(err){
            res.status(401).json({message: err.message})
        }else{
            req.user = payload
            next()
        }
    })

}

const roleAuth = async(req,res,next)=>{
    isSignIn (req,res, ()=>{
        if(req.user.role){
                next()
        }else{
            res.status(403).json({
                message: "you are not an admin"
            });
        }
    });
};

module.exports = {
    roleAuth

}