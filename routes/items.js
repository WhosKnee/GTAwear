var express = require("express")
var router = express.Router();
var Item = require("../models/item.js")

// create var to hold the order of the items in the item show page
var itemSort = "AtoZ";

router.get("/", function(req, res){
    res.redirect("/items");
});

router.get("/items", function(req,res){
    // create sorting var to place in sort function 
    var order = {name: 1};
    if(itemSort === "AtoZ"){
        order = {name: 1};
    } else if (itemSort === "ZtoA"){
        order = {name: -1};
    } else if (itemSort === "PLTH"){
        order = {price: 1};
    } else if (itemSort === "PHTL"){
        order = {price: -1};
    }
    // pass all the items from the db to the show page to be rendered
    Item.find({}, function(err, items){
        if(err){
            console.log(err);
        }
        else {
            res.render("items/show", {items: items});
        }
    }).sort(order);
})

router.get("/items/new", function(req, res){
    res.render("./items/new.ejs");
})

router.post("/items", function(req, res){
    var newItem = req.body.item;
    Item.create(newItem, function(err, newItemForDB){
        if(err){
            console.log(err)
        }
        else{
            // save the new item to the DB and return to show page
            newItemForDB.save();
            res.redirect("/items");
        }
    })
})

router.get("/items/:item_id/edit", function(req, res){
    Item.findById(req.params.item_id, function(err, foundItem){
        if(err){
            console.log(err);
        }
        else {
            res.render("./items/edit", {item: foundItem});
        }
    })
})

router.put("/items/:item_id", function(req, res){
    
    Item.findByIdAndUpdate(req.params.item_id, req.body.item, function(err, updatedItem){
        if(err){
            console.log("scoop");
            console.log(err);
        }
        else {
            res.redirect("/items/");
        }
    })
})

router.post("/items/sort", function(req, res){
    if(req.body.sortBy === "PLTH"){
        itemSort = "PLTH";
    }
    else if (req.body.sortBy === "PHTL"){
        itemSort = "PHTL";
    }
    else if (req.body.sortBy === "AtoZ"){
        itemSort = "AtoZ";
    }
    else if (req.body.sortBy === "ZtoA"){
        itemSort = "ZtoA";
    }
    res.redirect("/items/");
})

module.exports = router;