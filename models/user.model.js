const mongoose = require("mongoose") 
const validator = require('validator') 
const userRole = require('../utils/userRoles')

const userSchema = new mongoose.Schema({
    firstName :{
        type : String , 
        required : true 
    } , 
    lastName : {
        type : String , 
        required : true 
    } , 
    email : {
        type : String , 
        required : true , 
        unique : true ,
        validate : [validator.isEmail , 'Please enter a valid email'] 
    } , 
    password : {
        type : String , 
        require : true  
    }, 
    token : {
        type : String 
    },
    role : {
        type : String , 
        enum : [userRole.ADMIN , userRole.USER , userRole.MANAGER] , 
        default : userRole.USER 
    } ,
    avatar : {
        type : String ,
        default : 'uploads/profile.png' 
    }
})

module.exports = mongoose.model('User' , userSchema);