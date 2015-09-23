var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

var app = express();

mongoose.connect(config.database, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("Connected to the DB");
    }
});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan());

//app.get('/', function (req, res) {
    //res.sendfile('./public/index.html')
//});

/*app.get('/user/create', function (req, res){
    res.sendFile(__dirname + '/public/views/register.html')
});
*/

app.use(express.static(__dirname + '/public'));

app.listen(config.port, function (err) {
    if(err){
        console.log(err);
    } else {
        console.log("project on Port:3000");
    }
});

require('./app/routes')(app); // pass our application into our routes

exports = module.exports = app; 						// expose app
