var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    password:String,
    with: String,   
    images:Array,
    visible:String,
    gender:String,
    iGender:String,
    occupation:String,
    aboutMe:String,
    indexOfHeight:String,
    indexOfInterest:String,
    ageMin:String,
    ageMax:String,
    notySwitchStatus:String,
    soundSwitchStatus:String,
    idVerifyStatus:String,
    deleted:String,
});


var User = mongoose.model('User', UserSchema);
module.exports = User;


