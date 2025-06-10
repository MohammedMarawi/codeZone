const express = require('express') 
const router = express.Router() 
const appError = require('../utils/appError');

const multer = require('multer')  

const diskStorage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , 'uploads/') ; 
    }, 
    filename : (req , file , cb ) => {
        const ext = file.mimetype.split('/')[1] ; 
        const fileName = `user-${Date.now()}.${ext}` ; 
        cb(null , fileName) ;
    }
})  
const fileFilter = (req, file , cb) => {
    const imageType = file.mimetype.split('/')[0] ; 
    if(imageType === 'image') {
        return cb(null , true) ; 
    } else {
        return cb(appError.create('file must be image' , 400) , false) 
    }
}
const upload = multer({
    storage : diskStorage , 
    fileFilter 
}) 

const userController = require('../controllers/users.controller') 
const verifyToken = require('../middlewarse/verfiyToken') 
//get all user 
//register user 
//login user
router.route('/') 
            .get(verifyToken,userController.getAllUsers)
router.route('/register') 
            .post(upload.single('avatar') , userController.register)
router.route('/login') 
            .post(userController.login)


module.exports = router             