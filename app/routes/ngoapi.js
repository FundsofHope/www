var Ngo = require('../models/ngo');
var Project = require('../models/project')
var config = require('../../config');

var secret = config.secretKey;

var webtoken = require('jsonwebtoken');

function createToken(ngo) {

    var token = webtoken.sign({
        id: ngo._id,
        name: ngo.name,
        ngoid: ngo.ngoid
    }, secret, {
        expirtesInMinute: 180
    });

    return token;

}

module.exports = function(app, express) {

    var api = express.Router();

    api.post('/signup', function(req, res) {

        var ngo = new Ngo({
            name: req.body.name,
            ngoid: req.body.ngoid,
            password: req.body.password,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone
        });

        ngo.save(function(err) {
            if(err) {
                res.send(err);
                return;
            }
            res.json({message: 'Your NGO has been Registered with us, You\'re Welcome'});
        });
    });

    api.get('/all', function(req, res){

        Ngo.find({}, function(err, ngos){
            if(err){
                res.send(err);
                return;
            }
            res.json(ngos);
        });

    });

    api.get('/:ngoid', function(req, res){

        Ngo.findOne({ ngoid: req.params.ngoid }, function(req, obj){
            res.json(obj);
        });

    });

    api.route('/:ngoid/project')

        .post(function(req, res) {

            var project = new Project({
                host: req.params.ngoid,
                description: req.body.description,
                title: req.body.title,
                cost: req.body.cost
            });

            project.save(function(err) {
                if(err) {
                    res.send(err);
                    return
                }
                res.json({message: "New Project Created!"});
            });
        })


        .get(function(req, res) {

            Project.find({ host: req.params.ngoid }, function(err, obj) {

                if(err) {
                    res.send(err);
                    return;
                }

                res.send(obj);
            });
        });


    api.post('/login', function(req, res){

        Ngo.findOne({
            ngoid: req.body.ngoid
        }).select('password').exec(function(err, ngo) {
            if(err) throw err;

            if(!ngo) {
                res.send({message: "You NGO doesn't exist in our databases."});
            }else if(ngo) {
                var validate = ngo.comparePass(req.body.password);

                if (!validate) {
                    res.send({message: "Invalid Password"});
                } else {
                    var token = createToken(ngo);

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

    //api.get('/me', function(req, res) {
    //res.send(req.decoded);
    //});


    return api;

};