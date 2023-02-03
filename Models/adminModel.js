const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    nameOfSchool : {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    phoneNumber: {
        type: String
    },
    image: {
        type: String
    },
    cloudId: {
        type: String
    },
    address: {
        type: String
    },
    targetLine: {
        type: String
    },
    website: {
        type: String
    },
    country: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    isVerified: {
        type: String,
        default: false
    }
});

const AdminSchema = mongoose.model("Admin", adminSchema)

module.exports = AdminSchema