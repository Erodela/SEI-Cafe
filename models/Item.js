const mongoose = require("mongoose");

require("./Category");

const itemSchema = require("./itemSchema");

module.exports = mongoose.model("Item", itemSchema);
