const subjectModel = require("../Models/subjectModel")

exports.addSubject = async(req,res)=>{
    try {
        const newSubject = await subjectModel.create(req.body)
        res.status(201).json({
            message: 'create sucessfully.',
            data:newSubject
        })

    }catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

exports.allSubject = async(req, res)=>{
    try{
        const addedSubject = await subjectModel.find();
            res.status(201).json({
                subjectlength: addedSubject.length,
                message: "All SUBJECTS",
                data: addedSubject
            })
    }catch(e){
        res.status(400).json({
            message: e.message
        })
    }
}

exports.oneSubject = async(req, res)=>{
    try{
        const id = req.params.subjectId
        const singleSubject = await subjectModel.findById(id)
        if(!singleSubject) {
            res.status(404).json({
                message: `No such Subject`
            })
        }else{
            res.status(201).json({
                message: "SINGLE CLASS .",
                data: singleSubject
            })
        }
    }catch(e){
        res.status(400).json({
            message: e.message
        })
    }
}

exports.updateSubject = async (req, res)=>{
    try{
        const id = req.params.subjectId;
        const updatedSubject = await subjectModel.findByIdAndUpdate(id, req.body)
        if(!updatedSubject){
            res.status(404).json({
                message: "Subject doesnt exist"
            })
        }else{
            res.status(200).json({
                message: 'sucessfully updated.',
                data: updatedSubject
            })
        }
    }catch(e){
        res.status(500).json({
            message: e.message
        })
    }
}

exports.deleteSubject = async(req, res)=>{
    try{
        const id = req.params.subjectId
        const removeSubject = await subjectModel.findByIdAndDelete(id)
        if(!removeSubject){
            res.status(404).json({
                message: `No such Subject`
            })
        }else{
            res.status(200).json({
                message: ' SUBJECT SUCESSFULLY DELETED.'
            })
        }
    }catch(e){
        res.status(400).json({
            message: e.message
        })
    }
}