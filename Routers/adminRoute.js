const express = require("express");
const{newAdmin, confirmVerify,adminLogin, updateProfile} = require("../Controllers/adminController");
const{newStudent,getAllStudents, deleteStudents,studentLogin, confirmVerified} = require("../Controllers/addStudent");
const {roleAuth} = require("../Utils/authorization");
// const {isSignIn} = require("../Utils/authorization");



const Route = express.Router();

Route.route("/admin/sign").post(newAdmin);
Route.route("/userVerify/:id").post(confirmVerify);
Route.route("/verifyStudent/:studentid").post(confirmVerified);
Route.route("/admin/login").post(adminLogin);
Route.route("/student/login").post(studentLogin);
Route.route("/admin/:userId").post(roleAuth, newStudent);
Route.route("/admin/allStudent/:userId").get(roleAuth, getAllStudents);
Route.route("/admin/deleteStudent/:userId/:studentid").delete(roleAuth,deleteStudents);
// Route.route("/admin/updatedProfile/:userid").patch(updateProfile);


module.exports = Route