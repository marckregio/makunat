var Pair = require('../models/pair');
var Host = require('../models/host');
var pairsuccess = 2001;
var pairnotsuccess = 2002;
var alreadypaired = 2003;
var hostnotfound = 2004;
var hoststopped = 2005;

exports.postPair = function(req, res){
	var pair = new Pair();
	
	
	pair.hostid = req.body.hostid;
	pair.created = req.body.created;
	pair.clientid = req.body.clientid;
	
	Host.findOne({hostid: pair.hostid, activehost: true}, function(err, gethost){
		if (err)
			return res.json({result: pairnotsuccess, message:err});

		if (gethost != null){
			pair.paired = true;
			Pair.findOne({clientid: pair.clientid, hostid: gethost.hostid}, function(err, getpair){
				if (err) {
					return res.json({success: pairnotsuccess, message:err});
				}
				else if (getpair != null){
					res.json({result: pairsuccess, message: getpair});
					//host to send latlong
				} else {
					pair.save(function (err){
						if (err)	
							return res.json({result: pairnotsuccess, message:err});
				
						sendNotif(pair.hostid, pair.clientid);
						res.json({result: pairsuccess, message: pair});
						//host to send latlong
					});
				}
			});
			
		}	else {
			res.json({result: hostnotfound, message:"Host not found."});
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
	Pair.findOne({clientid: req.params.clientid}, function(err, pair){
		if (err)
			return res.send(err);
		
		Host.findOne({hostid: pair.hostid, activehost:true}, function(err, gethost){
			if (err)
				return res.json({result: pairnotsuccess, message:err});

			if (gethost != null){
				res.json(pair);
			} else {
				res.json({result: hoststopped, message:"Host stopped."});
			}
		});
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
