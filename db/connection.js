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
  mongoose.connect(process.env.MONGOLAB_URI);
}else{
  mongoose.connect("mongodb://localhost/whenpresident");
}

module.exports = mongoose;
