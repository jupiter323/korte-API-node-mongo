//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = "mongodb://reema:reemathitha911@ds151612.mlab.com:51612/kortedb";
// var mongoDB = "mongodb://localhost:27017/Korte";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var express=require("express");
var app=express();
var port=process.env.PORT||3000;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fcmRouter = require('./routes/pushnotification');
var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set("view engine", "ejs");//set the view engine to ejs
app.use(express.static("./public"));//serve static content for the app from the public directory. ie when entering a url, it looks inside the public folder
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pushnotification', fcmRouter);

app.listen(port, ()=>{
  console.log("Listening on Port: "+port);
});//listen to port

