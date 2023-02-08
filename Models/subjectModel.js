const mongoose = require("mongoose")

const subjectSchema = new mongoose.Schema({
    className: {
        type: String
    },
    subjectName: {
        type: String
    },
    subjectTeacher: {
        type: String
    }
},
{
    timestamps: true
})

const subjectModel = mongoose.model("addSubject", subjectSchema);

module.exports= subjectModel