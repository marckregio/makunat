var mongoose = require('mongoose');

var Host = new mongoose.Schema({
	hostid: {
		type: String
	},
	key: {
		type: String
	},
  created: {
    type: String
  }
});

module.exports = mongoose.model('Host', Host);