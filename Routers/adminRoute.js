const express = require("express");
const{newAdmin, confirmVerify,adminLogin} = require("../Controllers/adminController");
const{newStudent,getAllStudents, deleteStudents,studentLogin, confirmVerified} = require("../Controllers/addStudent");
const {roleAuth} = require("../Utils/authorization");
// const {isSignIn} = require("../Utils/authorization");



const Route = express.Router();

Route.route("/admin/sign").post(newAdmin);
Route.route("/userVerify/:id").post(confirmVerify);
Route.route("/verifyStudent/:studentid").post(confirmVerified);
Route.route("/admin/login").post(adminLogin);
Route.route("/student/login").post(studentLogin);
Route.route("/admin/:userid").post(roleAuth, newStudent);
Route.route("/admin/allStudent/:userid").get(roleAuth, getAllStudents);
Route.route("/admin/deleteStudent/:userid/:studentid",roleAuth).delete(deleteStudents);
// Route.route("/admin/image/:id").patch(updateImage);



module.exports = Route