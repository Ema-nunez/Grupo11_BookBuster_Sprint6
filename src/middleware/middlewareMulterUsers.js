const multer = require('multer');
const path = require('path')


const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'../../public/images/avatars'));
    },
    filename : function(req,file,cb){
        cb(null, `Avatar_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({storage});



module.exports = upload;