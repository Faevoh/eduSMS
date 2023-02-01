const express = require("express");
const{newAdmin, confirmVerify,adminLogin} = require("../Controllers/adminController");
const{newStudent,getAllStudents, deleteStudents} = require("../Controllers/addStudent");
const {roleAuth} = require("../Utils/authorization");


const Route = express.Router()

Route.route("/admin/sign").post(newAdmin);
Route.route("/userVerify/:id").post(confirmVerify);
Route.route("/admin/login").post(adminLogin);
Route.route("/admin/:userid").post(roleAuth,newStudent);
Route.route("/admin/allStudent").post(roleAuth,getAllStudents);
Route.route("/admin/:userid/:studentid").post(roleAuth,deleteStudents);


module.exports = Route