var mongoose = require('mongoose');

var Pair = new mongoose.Schema({
	hostid: {
		type: String
	},
	key: {
		type: String
	},
  created: {
    type: String
  },
	clientid: {
		type: String
	}
});

module.exports = mongoose.model('Pair', Pair);