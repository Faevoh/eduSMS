const AddStudent = require("../Models/addStudentModel");

exports.newStudent = async(req,res)=>{
    try{
        const {email, password} = req.body;
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        const data = {
            email,
            password: hash
        }
        const createNewUser = new AddStudent(data);
        const userToken = jwt.sign({
            id: createNewUser._id,
            password: createNewUser.password,
            role: createNewUser.role
        }, process.env.JWT_TOKEN,{expiresIn: "1d"});

        createNewUser.token = userToken;
        await createNewUser.save();

        const userVerify = `${req.protocol}://${req.get("host")}/api/userVerify/${createNewUser._id}`;
        const message = `You have been registered as New User in the Eduglobal Application.
        Thank you for registering with our app. Please click this link ${userVerify} to verify your account`
        emailSender({
            email: createNewUser.email,
            subject: "Kindly Verify your account",
            message,
        });

        res.status(201).json({
            message: "New Student Added",
            data: created
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
        
        const user = await AddStudent.findById(id)
       
        await AddStudent.findByIdAndUpdate(
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