// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  var user = new User();
  
  user.username= req.body.username;
  user.password= req.body.password;
  user.deviceid= req.body.deviceid;
  user.registeredip= req.ip;
  user.registereddate= req.timestamp;

  user.save(function(err) {
    if (err)
      return res.json({success: 0, message: err});

    res.json({success: 1, message: user });
  });
}

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      return res.send(err);

    res.json(users);
  });
}
// Create endpoint /api/users/:username for GET
exports.getOneUser = function(req, res) {
  User.find({ username: req.params.username}, function(err, user) {
    if (err)
      return res.send(err);
    res.json(user);
  });
};

// Delete user /api/users/:username using DELETE
exports.deleteUsers = function(req, res) {
  User.remove({ username: req.params.username}, function(err) {
    if (err)
      return res.send(err);

    res.json({success: 1, message: req.params.username + ' Removed' });
  });
}

//Update user /api/users using PUT
exports.updateUser = function(req, res) { 
  var user = new User();
  
  user.username= req.body.username;
  user.password= req.body.password;
  user.deviceid= req.body.deviceid;
  user.registeredip= req.ip;
  user.registereddate= req.timestamp;

  user.update(function(err) {
    if (err)
      return res.json({success: 0, message: err});

    res.json({success: 1, message: user });
  });
}