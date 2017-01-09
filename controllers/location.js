// Load required packages
var Location = require('../models/location');


exports.setLocation = function(req, res){
	var loc = new Location();
	
	loc.hostid = req.body.hostid;
	loc.created = req.body.created;
	loc.latitude = req.body.latitude;
	loc.longitude = req.body.longitude;
	
	Location.find({hostid: loc.hostid}, function(err, getloc){
		if (err)
			return res.json(err);
		
		if (getloc.length > 0)
			loc.chronID = getloc.length;
		else 
			loc.chronID = 0;
		
		loc.save(function (err){
			if (err)
				return res.json({result: 'Invalid Return'});
		
			res.json(loc);
		});
	});
}

exports.getLocations = function(req, res){
	Location.find({hostid: req.params.hostid}, function (err, loc){
		if (err)
			return res.send(err);
		
		res.json(loc);
	});
}