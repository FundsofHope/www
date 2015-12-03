var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

var app = express();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if( env === 'production') {
    mongoose.connect(config.remote_db, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to DB');
        }
    });
} else {
    mongoose.connect(config.local_db, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to DB');
        }
    });
}

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname+ '/public'));

var userapi = require('./app/routes/userapi')(app, express);
app.use('/user', userapi);

var ngoapi = require('./app/routes/ngoapi')(app, express);
app.use('/ngo', ngoapi);

var projapi = require('./app/routes/projectapi')(app, express);
app.use('/project', projapi);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/app/views/index.html');
});

app.get('/:getfile', function (req, res) {
   res.sendFile(__dirname + '/public/app/views/' + req.params.getfile);
});

app.listen(config.port, function(err) {
    if(err) {
        console.log(err);
    }else {
        console.log("Project running on port 3000");
    }
});