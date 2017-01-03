var Host = require('../models/host');

exports.postHost = function(req, res){
  var host = new Host();
  
  host.hostid = req.body.hostid;
  host.key = req.body.key;
	host.created = req.body.created;
	
	Host.find({key: host.key, hostid: host.hostid}, function(err, gethost){
		if (err)
			return res.json({success: 0, message:err});
		
		if (gethost.length > 0)
			res.json({success: 0, message: "Key already used. Please input a different key.", hostid: gethost[0].hostid});
		else 
			host.save(function (err) {
				if (err)
					return res.json({success: 0, message: err});
		
				res.json({success: 1, message: host});
			});
	});
	
	
}

exports.getHosts = function(req, res){
	Host.find(function (err, hosts){
		if (err)
			return res.send(err);
		
		res.json(hosts);
	});
}

exports.getHost = function(req, res){
	Host.find({hostid: req.params.hostid}, function(err, host){
		if (err)
			return res.send(err);
		
		res.json(host);
	});
}

exports.deleteHost = function(req, res){
	Host.remove({hostid: req.params.hostid}, function(err){
		if (err)
			return res.send(err);
		
		res.json({success: 1, message: req.params.hostid + ' Removed'});
	});
}
