var express = require('express');
var app = express();
var port = 4000;
var router = express.Router();
var bodyparser = require('body-parser');
var passport = require('passport');
var time = require('express-timestamp');
var fs = require('serve-index');

app.use(time.init);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use('/files', fs('/usr/lib/makunatAPI', {'icons': true}));
app.use('/apps', fs('/usr/lib/makunatAPI/apps', {'icons': true}));
app.use('/files', express.static("/usr/lib/makunatAPI/"));
app.use('/apps', express.static("/usr/lib/makunatAPI/apps/"));

var mongoose = require('mongoose');
mongoose.connect('mongodb://notification.smedia.com.au:27017/makunat');

//app.use('/', function(req, res){
//  res.json({message: 'PUTANG INA MO! HAHAHA',author: 'Marck Regio', year: '2017'});
//});

//Initialize controllers
var userController = require('./controllers/user');
var hostController = require('./controllers/host');
var clientController = require('./controllers/pair');
var locationController = require('./controllers/location');

//users
router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers);
router.route('/users/:username')
  .get(userController.getOneUser)
  .delete(userController.deleteUsers);
//host
router.route('/host')
	.get(hostController.getHosts)
	.post(hostController.postHost);
router.route('/host/:hostid')
	.get(hostController.getHost)
	.delete(hostController.deleteHost);
//client
router.route('/pair')
	.get(clientController.getPairs)
	.post(clientController.postPair);
router.route('/pair/:clientid')
	.get(clientController.getPair);
router.route('/location')
	.post(locationController.setLocation);
router.route('/location/:hostid')
	.get(locationController.getLocations);


app.use('/api', router);
app.listen(port);
console.log('Running');