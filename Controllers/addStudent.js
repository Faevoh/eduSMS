const AddStudent = require("../Models/addStudentModel");
const cloudinary = require("../Utils/cloudinary");
const emailSender = require("../Utils/email");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")

exports.newStudent = async(req,res)=>{
    try{
        const {studentName,email, password,regNumber,studentClass,admissionYear, guardianPhoneNumber,DOB} = req.body;
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        const data = {
            studentName,
            email,
            password: hash,
            regNumber,
            studentClass,
            admissionYear,
            guardianPhoneNumber,
            DOB
        }
        const createNewUser = new AddStudent(data);
        const userToken = jwt.sign({
            id: createNewUser._id,
            password: createNewUser.password,
            role: createNewUser.role
        }, process.env.JWT_TOKEN,{expiresIn: "1d"});

        createNewUser.token = userToken;
        await createNewUser.save();

        const userVerify = `${req.protocol}://${req.get("host")}/api/verifyStudent/${createNewUser._id}`;
        const message = `You have been registered as New User in the Eduglobal Application.
        Thank you for registering with our app. Please click this link ${userVerify} to verify your account`
        emailSender({
            email: createNewUser.email,
            subject: "Kindly Verify your account",
            message,
        });

        res.status(201).json({
            message: "New Student Added",
            data: createNewUser
        });
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};

exports.confirmVerified = async(req,res)=>{
    try{
        const id = req.params.studentid;
        
        const user = await AddStudent.findById(id)
       
        await AddStudent.findByIdAndUpdate(
            user._id,
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
exports.getAllStudents = async(req,res)=>{
    try{
        const allStudents = await AddStudent.find();
        res.status(201).json({
            message: "All Students",
            length: allStudents.length,
            data: allStudents
        });    
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};
exports.deleteStudents = async(req,res)=>{
    try{
        const studentid = req.params.studentid
        await AddStudent.findByIdAndDelete(studentid);
        res.send  ("Successfully Deleted")
    }catch(e){
        res.status(404).json({
            message: e.message
        });
    }
};
exports.studentLogin = async(req,res) => {
    try{
        const {email,password, role} = req.body
        const check = await AddStudent.findOne({ email: email}); 
        if(!check) return res.status(404).json({message: "Not Found"});
        const IsPassword = await bcryptjs.compare(password, check.password)
        if(!IsPassword) return res.status(404).json({message: "Email or Password incorrect"});
        if(!check.role == 2) return res.status(400).json({message: "You are not a student, you cannot login"});

        const myToken = jwt.sign({
            id: check._id,
            password: check.password,
            role: check.role
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