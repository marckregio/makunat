var Pair = require('../models/pair');
var Host = require('../models/host');

exports.postPair = function(req, res){
	var pair = new Pair();
	
	
	pair.key = req.body.key;
	pair.created = req.body.created;
	pair.clientid = req.body.clientid;
	
	Host.find({key: pair.key}, function(err, gethost){
		if (err)
			return res.json({success: 0, message:err});
		
		pair.hostid = gethost[0].hostid;
		if (pair.hostid != ""){
			Pair.find({clientid: pair.clientid, hostid: pair.hostid}, function(err, getpair){
				if (err)	
					return res.json({success: 0, message:err});
				else if (getpair.length > 0)
					res.json({success: 1, 
										message: "Already Paired to Host.",
							 			hostid: pair.hostid});
				else 
					pair.save(function (err){
						if (err)	
							return res.json({success: 0, message:err});
				
						sendNotif(pair.hostid, pair.clientid);
						res.json({success: 1, message: pair});
					});
			});
			
		}	else {
			res.json({success: 0, message:"No Hostid Found."});
		}
	});
	
	
}

exports.getPairs = function(req, res){
	Pair.find(function (err, pair){
		if (err)
			return res.send(err);
		
		res.json(pair);
	});
}

exports.getPair = function(req, res){
	Pair.find({clientid: req.params.clientid}, function(err, pair){
		if (err)
			return res.send(err);
		
		res.json(pair);
	});
}

var request = require('request');
function sendNotif (hostid, clientid){
	var json = "{ \"users\": [\"" + hostid + "\",\"" + clientid + "\"]," +
								"\"android\": { \"data\": { \"title\": \"Follow Me\"," + 
								"\"message\": \" You are now connected. \"}}}";
	console.log(json);
	//request.post("http://notification.smedia.com.au:1000/send", JSON.parse(json));
}
