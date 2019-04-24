var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.js");

// login GET route
router.get("/login", function(req, res){
    // render the login ejs page
    res.render("./index/login");
})

// login POST route 
router.post("/login", passport.authenticate("local", {
    successRedirect: "/items",
    failureRedirect: "login"
}))

// registration GET route
router.get("/register", function(req, res){
    res.render("/index/register");
})

// registration POST route
router.post("/register", function(req, res){
    // first create the user object with a username
    var newUser = new User({username: req.body.username});
    // register the user object with the password so that
    // passport can hash the password securely
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            res.redirect("/register");
        }
        passport.authenticate("local", {
            successRedirect: "/items"
        })
    })
})

module.exports = router;
