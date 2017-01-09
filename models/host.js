var mongoose = require('mongoose');

var Host = new mongoose.Schema({
	hostid: {
		type: String
	},
  created: {
    type: String
  },
	activehost: {
		type: Boolean
	}
});

module.exports = mongoose.model('Host', Host);