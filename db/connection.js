var mongoose = require("mongoose");

var CrazyUrlSchema = new mongoose.Schema(
  {
    oldUrl: String,
    newUrl: String
  }
);

mongoose.model("CrazyUrl", CrazyUrlSchema);
// mongoose.connect("mongodb://localhost/crazy-url-shortener");


if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGODB_URI);
}else{
  mongoose.connect("mongodb://localhost/crazy-url-shortener");
}

module.exports = mongoose;
