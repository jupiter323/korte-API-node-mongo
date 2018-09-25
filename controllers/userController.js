

var bcrypt = require('bcrypt');
const saltRounds = 10;
var User = require('../models/User');

exports.index = (req, res) => {
  User.find({}, (err, data) => {
    if (err) throw err;
    res.render("korte", { users: data });
  });
};

exports.uploadprofileimage = (req, res) => {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let avatarImage = req.files.avatarImage;

  // Use the mv() method to place the file somewhere on your server
  avatarImage.mv('/resources/images/user'+new Date().getTime()+ Math.floor(Math.random() * 100000)+'.jpg', function (err) {
    if (err)
      return res.status(500).send(err);
    res.send('File uploaded!');
  });
}

exports.user_list = (req, res) => {
  
  User.find({}, (err, users) => {
    if (err) throw err;
    res.json(users);
  });
};

exports.user_delete = (req, res) => {
  User.find({ name: req.params.name.replace(/\-/g, " ") }).remove((err, data) => {
    if (err) throw err;
    res.json(data);
  });
};

exports.user_add = (req, res) => {
  console.log(req.body);
  User.find({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    if (user.length != 0) {
      if (req.body.with == "facebook")
        res.json({ success: true, user: user[0] }); //facebook login again
      else
        res.json({ success: false, err: "Already registered" }); // email registered
    } else {
      bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
        req.body.password = hash;
        User.create(req.body, (err, user) => {
          if (err) throw err;
          res.json({ success: true, user: user }); // email or facebook register as new
        });
      });
    }
  });
};

exports.user_login = (req, res) => {
  User.find({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    if (user.length != 0) {
      bcrypt.compare(req.body.password, user[0].password).then(function (passres) {
        if (passres)
          res.json({ success: true, user: user[0] });//success
        else
          res.json({ success: false, err: "The password is invalid." });//unsuccess
      });
    } else {
      res.json({ success: false, err: "You are not registered." });//unsuccess
    }
  })
}
