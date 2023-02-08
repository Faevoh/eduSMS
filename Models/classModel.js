const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    nameOfClass: {
        type: String
    },
    classBranch: {
        type: String,
    },
    monthlyTutionFees: {
        type: String
    },
    selectClassTeacher: {
        type: String
    }
},{
    timestamps: true
});

const classModel = mongoose.model("addClass", classSchema);

module.exports = classModel