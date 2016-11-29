var express = require('express');
var app = express();
var port = 8000;
var router = express.Router();
var bodyparser = require('body-parser');
var passport = require('passport');
var time = require('express-timestamp')

app.use(time.init);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://notification.smedia.com.au:27017/makunat');

router.get('/', function(req, res){
  res.json({message: 'You are entering to our deepweb facility'});
});

//Initialize controllers
var userController = require('./controllers/user');

//users
router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers)
router.route('/users/:username')
  .get(userController.getOneUser)
  .delete(userController.deleteUsers);
 



app.use('/api', router);
app.listen(port);
console.log('Running');