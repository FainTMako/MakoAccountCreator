var request = require('request');
var GUID = require('../rotmg/guid');

var g = GUID.create();
var RotmgProductionURL = "https://realmofthemadgodhrd.appspot.com"
 
function createAccount(req, res, account)
{
	console.log("getting final url");
	var finalUrl = RotmgProductionURL + '/account/register?g=' +g;
	httpRequest(finalUrl, makeDataPacket(account), (webRes)=>{
		res.send(webRes);
	});
};

function httpRequest(url, data, callback)
{
	request.post({url: url, form: data}, function (error, response, body){
		callback(body);
	});
};

function makeDataPacket(account)
{
	var _local_1 = {};
	_local_1.guid = g;
	_local_1.newGUID = account.email;
	_local_1.newPassword = account.password;
	_local_1.entrytag = "";
	_local_1.signedUpKabamEmail = 0;
	_local_1.isAgeVerified = 1;
	return (_local_1);
}

module.exports = 
{
	createAccount: createAccount
};