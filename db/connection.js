var mongoose = require("mongoose");

var CrazyUrlSchema = new mongoose.Schema(
  {
    oldUrl: String,
    newUrl: String
  }
);

mongoose.model("CrazyUrl", CrazyUrlSchema);
mongoose.connect("mongodb://localhost/crazy-url-shortener");

module.exports = mongoose;
