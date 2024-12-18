var express = require('express')
var app= express()
var mongoose = require('mongoose')
var hotelRouter = require('./Controller/hotelController')
var http = require('http')
var { socketIO } = require('./Service/hotelService')

var server = http.createServer(app)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
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

const io = socketIO(server);
server.listen(3000,()=>{
    console.log('server started !');
})

