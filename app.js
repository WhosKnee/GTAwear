var express = require("express");
    app     = express();
    bodyParser = require("body-parser");
    mongoose = require("mongoose");
    Item    = require("./models/item");
    methodOverride = require("method-override");


// create db to manipulate sorting of items 
mongoose.connect("mongodb://localhost:27017/store_v1", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// import routes
var itemRoutes = require("./routes/items");
app.use(itemRoutes);
var indexRoutes = require("./routes/index");
app.use(indexRoutes);

app.listen(3000, function(){
    console.log("Store Server On!");
 });