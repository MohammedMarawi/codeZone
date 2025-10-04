const express = require('express') 
const router = express.Router() 
const courseController = require('../controllers/course.controller')
const { validationSchema } = require('../middlewarse/validation')
const verifyToken = require('../middlewarse/verfiyToken')
const userRoles = require('../utils/userRoles')
const allowedTo = require('../middlewarse/allowedTo')

router.route('/') 
            .get(courseController.getAllCourse )
            .post(verifyToken ,allowedTo(userRoles.MANAGER) , validationSchema() , courseController.addCourse)

router.route('/:courseId')
            .get(courseController.getCourse )
            .patch(courseController.updateCourse)   
            .delete(verifyToken , allowedTo(userRoles.ADMIN , userRoles.MANAGER) ,courseController.deleteCourse)

module.exports = router 

//