var mongoose = require("mongoose");

var itemSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    // the number of likes on an item
    // should initially be 0
    likes: { type: Number, default: 0}
})

module.exports = mongoose.model("Item", itemSchema);