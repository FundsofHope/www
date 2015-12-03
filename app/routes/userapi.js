var User = require('../models/user');
var config = require('../../config');

var webtoken = require('jsonwebtoken');

var secret = config.secretKey;

function createToken(user) {

    var token = webtoken.sign({
        id: user._id,
        name: user.name,
        username: user.username
    }, secret, {
        expirtesInMinute: 1440
    });

    return token;

}


module.exports = function(app, express) {

    var api = express.Router();

    api.post('/signup', function(req, res) {

        var user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone:req.body.phone
        });

        user.save(function(err) {
            if(err) {
                res.send(err);
                return;
            }
            res.json({message: 'User has been Created', code: 2000});
        });
    });

    //api.get('/all', function(req, res){
    //
    //    User.find({}, function(err, users){
    //        if(err){
    //            res.send(err);
    //            return;
    //        }
    //        res.json(users);
    //    });
    //
    //});

    api.post('/login', function(req, res){

        User.findOne({
            username: req.body.username
        }).select('password').exec(function(err, user) {
            if(err) throw err;

            if(!user) {
                res.send({message: "user doesn't exist "});
            }else if(user) {
                var validate = user.comparePass(req.body.password);

                if (!validate) {
                    res.send({message: "Invalid Password"});
                } else {
                    var token = createToken(user);

                    res.json({
                        login: true,
                        message: "Successfully login!",
                        token: token

                    });
                }
            }

        });
    });

    api.use(function(req, res, next) {


        //console.log("Somebody just came to our app!");

        var token = req.body.token || req.param('token') || req.headers['x-access-token'];

        if(token) {

            webtoken.verify(token, secret, function(err, decoded) {

                if(err) {
                    res.status(403).send({ success: false, message: "Failed to authenticate user"});

                } else {

                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.status(403).send({ success: false, message: "No Token Provided"});
        }

    });

    api.get('/', function(req, res){
        res.json({message: "Welcome to Home!"});
    });

    api.get('/:user', function(req, res){

        Ngo.findOne({ username: req.params.user }, function(req, obj){
            res.json(obj);
        });

    });

    //api.get('/me', function(req, res) {
        //res.send(req.decoded);
    //});

    return api;

};