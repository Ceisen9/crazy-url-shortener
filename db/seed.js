var mongoose = require("./connection");
var seedData = require("./seeds");

var CrazyUrl = mongoose.model("CrazyUrl");

CrazyUrl.remove({}).then(function(){
  CrazyUrl.collection.insert(seedData).then(function(){
    process.exit();
  });
});
