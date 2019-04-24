var mongoose = require("mongoose");
// passport local mongoose is required for linking the user object to authen. methods
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
})

UserSchema.plugin(passportLocalMongoose);

// create User collection in mongoose db
var User = mongoose.model("User", UserSchema);

// export the User collection
module.exports = User;