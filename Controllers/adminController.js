const AdminSchema = require("../Models/adminModel");
const emailSender = require("../Utils/email");
const cloudinary = require("../Utils/cloudinary");
const fs = require("fs");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.newAdmin = async(req,res)=>{
    try{
        const {nameOfSchool,email, password,phoneNumber,schoolImage,address,targetLine,website,country} = req.body;
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        const data = {
            nameOfSchool,
            phoneNumber,
            address,
            targetLine,
            website,
            country,
            schoolImage,
            email,
            password: hash
        }
        const createNewUser = new AdminSchema(data);
        // console.log(createNewUser)
        const userToken = jwt.sign({
            id: createNewUser._id,
            password: createNewUser.password,
            isAdmin: createNewUser.isAdmin
        }, process.env.JWT_TOKEN,{expiresIn: "1d"});

        createNewUser.token = userToken;
        await createNewUser.save();

        const userVerify = `${req.protocol}://${req.get("host")}/api/userVerify/${createNewUser._id}`;
        const message = `Thank you for registering with our app. Please click this link ${userVerify} to verify your account`
        emailSender({
            email: createNewUser.email,
            subject: "Kindly Verify your account",
            message,
        });

        res.status(201).json({
            message: "User Created",
            data: createNewUser
        });
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};

exports.confirmVerify = async(req,res)=>{
    try{
        const id = req.params.id;
        
        const user = await AdminSchema.findById(id)
       
        await AdminSchema.findByIdAndUpdate(
            user.id,
            {
                isVerified : true
            },
            {
                new: true
            }
        )

        res.status(201).json({
            message: "You have been verified"
        });
    }catch(e){
        res.status(400).json({
        message: e.message
       });
    }
}    
exports.adminLogin = async(req,res) => {
    try{
        const {email,password} = req.body
        const check = await AdminSchema.findOne({ email: email}); 
        if(!check) return res.status(404).json({message: "Not Found"});
        const IsPassword = await bcryptjs.compare(password, check.password)
        if(!IsPassword) return res.status(404).json({message: "Email or Password incorrect"});

        const myToken = jwt.sign({
            id: check._id,
            password: check.password,
            isAdmin: check.isAdmin
        }, process.env.JWT_TOKEN,{ expiresIn: "1d"});

        check.token = myToken
        await check.save();
        
        res.status(201).json({
            message: "Successful",
            data: check
        });
     }catch(e){
        res.status(404).json({
            message: e.message
        });
    }
};
exports.updateProfile = async(req,res)=>{
    try{
        const id = req.params.userid;
        const userId = await AdminSchema.findById(id);
        // console.log(userId)

        const {nameOfSchool,phoneNumber,address,targetLine,website,country,schoolImage} = req.body;
        const result = await cloudinary.uploader.upload(req.file.path);
        const data ={
         nameOfSchool,
         phoneNumber,
         address,
         targetLine,
         website,
         country,
         schoolImage: result.secure_url,
         cloudId: result.public_id
       }
       
        const updatedProfile = await AdminSchema.findByIdAndUpdate(userId, data)
        
        res.status(201).json({
            message: "Successfully Updated Profile",
            data: updatedProfile
        });
        
    }catch(e){
        res.status(404).json({
            message: e.message
        });
    }
};
