const express = require("express");
const{newAdmin, confirmVerify,adminLogin} = require("../Controllers/adminController");
const{newStudent,getAllStudents, deleteStudents,studentLogin, confirmVerified} = require("../Controllers/addStudent");
const {roleAuth} = require("../Utils/authorization");


const Route = express.Router();

Route.route("/admin/sign").post(newAdmin);
Route.route("/userVerify/:id").post(confirmVerify);
Route.route("/verifyStudent/:studentid").post(confirmVerified);
Route.route("/admin/login").post(adminLogin);
Route.route("/student/login").post(studentLogin);
Route.route("/admin/:userid",roleAuth).post(newStudent);
Route.route("/admin/allStudent/:userid",roleAuth).get(getAllStudents);
Route.route("/admin/deleteStudent/:userid/:studentid",roleAuth).delete(deleteStudents);
// Route.route("/admin/image/:id").patch(updateImage);



module.exports = Route