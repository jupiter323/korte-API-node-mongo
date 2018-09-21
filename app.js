//Set up mongoose connection
var mongoose = require('mongoose');
// var mongoDB = "mongodb://reema:reemathitha911@ds151612.mlab.com:51612/kortedb";
var mongoDB = "mongodb://localhost:27017/Korte";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var express = require("express");
var app = express();
var multer = require('multer');

var port = process.env.PORT || 3000;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.set("view engine", "ejs");//set the view engine to ejs
app.use(express.static("./public"));//serve static content for the app from the public directory. ie when entering a url, it looks inside the public folder
// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', express.static(__dirname + '/public')); 
app.listen(port, () => {
  console.log("Listening on Port: " + port);
});//listen to port

const multerConfig = {
  storage: multer.diskStorage({
    //Setup where the user's file will go
    destination: function (req, file, next) {
      next(null, './public/storage');
    },

    //Then give the file a unique name
    filename: function (req, file, next) {
      console.log(file);
      const ext = file.mimetype.split('/')[1];
      next(null, file.fieldname + '-' + Date.now() + '.' + ext);
    }
  }),

  //A means of ensuring only images are uploaded. 
  fileFilter: function (req, file, next) {
    if (!file) {
      next();
    }
    const image = file.mimetype.startsWith('image/');
    if (image) {
      console.log('photo uploaded');
      next(null, true);
    } else {
      console.log("file not supported");

      //TODO:  A better message response to user on failure.
      return next();
    }
  }
};
app.post('/upload',multer(multerConfig).single('photo'),function(req,res){
  res.send('Complete!');
});
app.get('/', function(req, res){
  res.render('index.html');
});