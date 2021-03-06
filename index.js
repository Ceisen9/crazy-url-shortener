var express  = require("express");
var parser   = require("body-parser");
var hbs      = require("express-handlebars");
var mongoose = require("./db/connection");
var crazySyns = require("./db/crazysynonyms.js");
var letters = require("./db/alphabet.js");


var app      = express();
var CrazyUrl = mongoose.model("CrazyUrl");

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));

app.use("/assets", express.static("public"));
app.use(parser.json({extended: true}));
// app.use(parser.urlencoded({extended: true}));

function getRandomItem(some_array){
  var randomIndex = Math.floor((Math.random() * some_array.length));
  var randomArrayItem = some_array[randomIndex];
  return randomArrayItem;
};

function getRandomNumber(){
  var randomNum = Math.floor((Math.random() * 10));
  return randomNum;
};

function generateRandomUrl(){
  var randomSyn = getRandomItem(crazySyns);
  var randomLetter1 = getRandomItem(letters);
  var randomLetter2 = getRandomItem(letters);
  var randomLetter3 = getRandomItem(letters);
  var randomNumber1 = getRandomNumber();
  var randomNumber2 = getRandomNumber();
  var randomNumber3 = getRandomNumber();
  return randomSyn + randomLetter1 + randomNumber1 + randomLetter2 + randomNumber2 + randomLetter3 + randomNumber3
};

app.get("/api/crazyUrls", function(req,res){
  // CrazyUrl.find({}).then(function(crazyUrls){
  CrazyUrl.find({}).lean().exec().then(function(crazyUrls){
    res.json(crazyUrls);
    // console.log(crazyUrls);
    // res.render("urls-index", {
    //   crazyUrls: crazyUrls
    // });
  });
});

app.get("/api/crazyUrls/:oldUrl", function(req, res){
  CrazyUrl.findOne({oldUrl: req.params.oldUrl}).then(function(crazyUrl){
    res.json(crazyUrl)
    // res.render("urls-show", {
    //   crazyUrl: crazyUrl
    // });
  });
});

app.post("/api/crazyUrls", function(req, res){
  CrazyUrl.create(req.body.crazyUrl).then(function(crazyUrl){
    crazyUrl.newUrl = generateRandomUrl();
    crazyUrl.save();
    res.json(crazyUrl);
    // res.redirect("/crazyUrls/" + crazyUrl.oldUrl)
  });
});

// app.post("/crazyUrls/:oldUrl/delete", function(req, res){
app.delete("/api/crazyUrls/:oldUrl/delete", function(req, res){
  CrazyUrl.findOneAndRemove({oldUrl: req.params.oldUrl}).then(function(){
    res.json({success: true});
    // res.redirect("/crazyUrls")
  });
});

// app.post("/crazyUrls/:oldUrl", function(req, res){
app.put("/api/crazyUrls/:oldUrl", function(req, res){
  CrazyUrl.findOneAndUpdate({oldUrl: req.params.oldUrl}, req.body.crazyUrl, function(crazyUrl){
    res.json(crazyUrl);
    // res.redirect("/crazyUrls/" + crazyUrl.oldUrl)
  });
});

app.get("/*", function(req, res){
  res.render("url");
});


app.listen(app.get("port"), function(){
  console.log("It'ssss Johnny!");
});
