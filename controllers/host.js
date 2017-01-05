var Host = require('../models/host');
var uuid = require('node-uuid');
var hostcreated = 1001;
var cantcreatehost = 1002;
var hostupdate = 1003;
var hostcantupdate = 1004;
var hostnotfound = 1005;

exports.postHost = function(req, res){
  var host = new Host();
  
  host.hostid = req.body.hostid;
  host.key = uuid.v1();
	host.created = req.body.created;
	host.activehost = true;
	
	Host.findOne({hostid: host.hostid, activehost: true}, function(err, gethost){
		if (err)
			return res.json({result: cantcreatehost, message:err});
		
		if (gethost != null)
			res.json({result: cantcreatehost, message: "You have an active host instance.", hostid: gethost[0].hostid});
		else 
			host.save(function (err) {
				if (err)
					return res.json({result: cantcreatehost, message: err});
		
				res.json({result: hostcreated, message: host});
			});
	});
	
	
}

exports.getHosts = function(req, res){
	Host.find({activehost: true}, function (err, hosts){
		if (err)
			return res.send(err);
		
		res.json(hosts);
	});
}

exports.getHost = function(req, res){
	Host.findOne({hostid: req.params.hostid, activehost: true}, function(err, host){
		if (err)
			return res.send(err);
		
		if (host != null){
			res.json(host);
		} else {
			return res.json({result: hostnotfound, message: "Host stopped."});
		}
		
	});
}

exports.deleteHost = function(req, res){
	Host.findOne({hostid: req.params.hostid, activehost: true}, function(err, gethost){
		if (err)
			return res.send(err);
		
		gethost.activehost = false;
		gethost.save(function (err) {
			if (err)
				return res.json({result: hostcantupdate, message: err});
			
			res.json({result: hostupdate, message: gethost});
		});
		
	});
}
