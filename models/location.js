var mongoose = require('mongoose');
var Location = new mongoose.Schema({
	hostid: {
		type: String
	},
  created: {
    type: String
  },
	latitude: {
		type: String
	},
	longitude: {
		type: String
	},
	chronID: {
		type: Number
	}
});

module.exports = mongoose.model('Location', Location);