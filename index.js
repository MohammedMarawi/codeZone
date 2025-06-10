require('dotenv').config() ;  
const express = require('express')  
const app = express()
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const cors = require('cors') ; 
const httpStatusText = require('./utils/httpStatusTest') 

//connect to database in mongodb
const mongoose = require('mongoose') 
const url = process.env.MONGO_URL ; 
mongoose.connect(url).then(() => {
    console.log('mongodb server started') 
}) ;
//front end run
app.use(cors()) ; 

app.use(express.json()) ;

const coursesRouter = require('./routes/courses.route') 
const usersRouter = require('./routes/user.route') 

app.use('/api/courses', coursesRouter) 
app.use('/api/users' , usersRouter)

app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Welcome to the API' });
});

//global middlware for not found routers
app.use((req, res, next) => {
    res.status(404).json({
      status: httpStatusText.ERROR,
      message: 'This resource is not found'
    });
  });

//global error handler
app.use((error , req , res , next) => {
    res.status(error.statusCode || 500 ).json({status : error.StatusText || httpStatusText.ERROR , message : error.message , code : error.statusCode || 500 , data : null}) ; 
})
  
  

app.listen(process.env.PORT || 4100 , () => {
    console.log('listen on port: 4100')
})