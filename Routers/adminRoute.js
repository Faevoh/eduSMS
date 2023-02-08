const express = require("express");
const{newAdmin, confirmVerify,adminLogin, updateProfile} = require("../Controllers/adminController");
const{newStudent,getAllStudents, deleteStudents,studentLogin, confirmVerified} = require("../Controllers/addStudent");
const{newClass,allClass, oneClass, updateClass, deleteClass} = require("../Controllers/addClass");
const{addSubject,allSubject, oneSubject, updateSubject, deleteSubject} = require("../Controllers/addSubject");
const {roleAuth} = require("../Utils/authorization");
const multerImage = require("../Utils/multer");


const Route = express.Router();

Route.route("/admin/sign").post(newAdmin);
Route.route("/userVerify/:id").post(confirmVerify);
Route.route("/verifyStudent/:studentid").post(confirmVerified);
Route.route("/admin/login").post(adminLogin);
Route.route("/student/login").post(studentLogin);
Route.route("/admin/:userId").post(roleAuth, newStudent);
Route.route("/admin/allStudent/:userId").get(roleAuth, getAllStudents);
Route.route("/admin/deleteStudent/:userId/:studentid").delete(roleAuth,deleteStudents);
Route.route("/admin/updatedProfile/:userid").patch(multerImage,updateProfile);
Route.route("/admin/newClass/:userId").post(roleAuth, newClass);
Route.route("/admin/allClass/:userId").get(roleAuth, allClass);
Route.route("/admin/oneClass/:userId/:classId").get(roleAuth, oneClass);
Route.route("/admin/updateClass/:userId/:classId").patch(roleAuth, updateClass);
Route.route("/admin/deleteClass/:userId/:classId").delete(roleAuth, deleteClass);
Route.route("/admin/newSubject/:userId").post(roleAuth, addSubject);
Route.route("/admin/allSubject/:userId").get(roleAuth, allSubject);
Route.route("/admin/oneSubject/:userId/:subjectId").get(roleAuth, oneSubject);
Route.route("/admin/updateSubject/:userId/:subjectId").patch(roleAuth, updateSubject);
Route.route("/admin/deleteSubject/:userId/:subjectId").delete(roleAuth, deleteSubject);


module.exports = Route