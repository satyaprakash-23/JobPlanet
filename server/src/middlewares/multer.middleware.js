
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads')  //its relative to current working directory
    },
    filename : function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random())
        const extension = path.extname(file.originalname); 
        cb(null, file.fieldname + '-' + uniqueSuffix + extension); // Complete file name
    }
})


const upload = multer({
    storage
})

module.exports = upload;