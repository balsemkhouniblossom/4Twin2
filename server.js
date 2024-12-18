var express = require('express')
//var userRouter = require('./Controller/userController')
var app= express()
var mongoose = require('mongoose')
var hotelRouter = require('./Controller/hotelController')
var http = require('http')
var server = http.createServer(app)

app.use(express.json())
app.use('/hotels',hotelRouter)
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
mongoose.connect('mongodb://localhost:27017/user-db')
.then(()=>{
    console.log("DB connected!");

})

.catch((error)=>{
    console.log("error :" + error);

})

server.listen(3000,()=>{
    console.log('server started !');
})

