var express = require("express");
var request = require('request');	
var opn = require('opn');
var mkGen = require('./mag/MakoAccountGen');
var bodyParser = require('body-parser')
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var port = 4420;
var production = true;

app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "generator.html");
});

router.post("/create",function(req,res)
{
	var accountEmail = req.body.email;
	var accountPassword = req.body.password;
	mkGen.createAccount(req,res,{email:accountEmail, password:accountPassword});
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(port,function(){
	
  if(production)
	opn('http://localhost:' + port);
});




