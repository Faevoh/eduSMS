const classModel = require("../Models/classModel");

exports.newClass = async(req,res)=>{
    try {
        const data = {nameOfClass,classBranch,monthlyTutionFees, selectClassTeacher} = req.body;
        // const checkClassBranch = await classModel.findOne({classBranch});
        // if(checkClassBranch) return res.status(404).json({message: "This ClassBranch has already been added to the class"});
        // const checknameOfClass = await classModel.findOne({nameOfClass});
        // if(checknameOfClass) return res.status(404).json({message: "This ClassBranch has already been added to the class"});

        const createNew = await classModel.create(data)
        res.status(201).json({
            message: 'New Class Created Sucessfully.',
            data:createNew
        })
        
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

exports.allClass = async(req, res)=>{
    try{
        const addedClass = await classModel.find();
            res.status(201).json({
                classlength: addedClass.length,
                message: "All CLASSES",
                data: addedClass
            })
    }catch(e){
        res.status(400).json({
            message: e.message
        })
    }
}

exports.oneClass = async(req, res)=>{
    try{
        const id = req.params.classId
        const singleClass = await classModel.findById(id)
        if(!singleClass) {
            res.status(404).json({
                message: `No such Class`
            })
        }else{
            res.status(201).json({
                message: "A SINGLE CLASS.",
                data: singleClass
            })
        }
    }catch(e){
        res.status(400).json({
            message: e.message
        })
    }
}
exports.updateClass = async (req,res)=>{
    try{
        const id = req.params.classId;
        const updatedClass = await classModel.findByIdAndUpdate(id, req.body)
        if(!updatedClass ){
            res.status(404).json({
                message: `User doesnt exist`
            });
        }else{
            res.status(200).json({
                message: "Updated Successfully",
                data: updatedClass
            });
        }
    }catch(e){
        res.status(500).json({
            message: e.message
        });
    }
}
exports.deleteClass = async (req,res)=>{
    try{
        const id = req.params.classId;
        const removeClass = await classModel.findByIdAndRemove(id);
        
        if(!removeClass ){
            res.status(404).json({
                message: `NO such User`
            });
        }else{
            res.status(200).json({
                message: "Successfully deleted",
            });
        }
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
}