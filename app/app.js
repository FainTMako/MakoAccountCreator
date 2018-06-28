var express = require("express");
var fs = require("fs");
var request = require('request');	
var opn = require('opn');
var mkCreator = require('./mac/MakoAccountCreator');
var bodyParser = require('body-parser')
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var port = 4420;
var production = true;
var muleDumpPath = __dirname + '/muledump.json';

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

router.get("/generator.js",function(req,res){
	res.sendFile(path + "generator.js");
});

router.post("/muledump_add",function(req,res){
	console.log("md.add route called");
	let data = req.body.data;
	console.log(" data: " + JSON.stringify(data));
	updateMuleDump(data);
	res.send("Saved");
})

function updateMuleDump(accounts)
{
	let mdString = fs.readFileSync(muleDumpPath, { "encoding": "utf8"});
	let currentMuledumpJSON = JSON.parse(mdString);
	console.log("parsed current md: " + JSON.stringify(currentMuledumpJSON));
	//Copies one obj into another
	Object.assign(currentMuledumpJSON.accounts.accounts, accounts);
	fs.writeFile(muleDumpPath, JSON.stringify(currentMuledumpJSON, null, 4), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log("The file was saved!");
	}); 
}

router.post("/create",function(req,res)
{
	var accountEmail = req.body.email;
	var accountPassword = req.body.password;
	mkCreator.createAccount(req,res,{email:accountEmail, password:accountPassword});
});

app.use("/",router);

app.use("*",function(req,res){
	res.sendFile(path + "404.html");
});

app.listen(port,function(){
	
	if(production)
		opn('http://localhost:' + port);
});




