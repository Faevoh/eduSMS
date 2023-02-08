const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./adminLogo")
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()} $--(file.originalname)` )
    }
});

const fileFilter = (req, file, cb)=>{
    const ext = path.extname(file.originalname)
    if(ext !== ".jpg" || ext !== "jpeg" || ext !== "png"){
        cb(null, new Error ("Unsupported File Format"), false)
    }else{
        cb(null, true)
    }
}

const multerImage = multer({
    storage,
    fileFilter,
    limits :{
       fileSize:  1024 * 1024 * 5
    }
}).single("schoolImage");

module.exports = multerImage