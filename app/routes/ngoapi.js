var Ngo = require('../models/ngo');
var config = require('../../config');

var Project = require('../models/project');

var secret = config.secretKey;

var webtoken = require('jsonwebtoken');

function createToken(ngo) {

    var token = webtoken.sign({
        id: ngo._id,
        name: ngo.name,
        ngoid: ngo.ngoid
    }, secret, {
        expirtesInMinute: 1440
    });

    return token;

}

module.exports = function(app, express) {

    var api = express.Router();

    api.post('/signup', function(req, res) {

        var ngo = new Ngo({
            name: req.body.name,
            ngoid: req.body.ngoid,
            password: req.body.password

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

    api.post('/project/new', function(req, res) {

        var project = new Project({
            host: req.decoded.id,
            title: req.body.title,
            description: req.body.description,
            cost: req.body.cost
            });

            project.save(function(err) {
                if(err) {
                    res.send(err);
                    return
                }res.json({message: "New Project Created!"});
            });
        });



    api.route('/project')

        .get(function(req, res) {

            Project.find({ host: req.decoded.id }, function(err, projects) {

                if(err) {
                    res.send(err);
                    return;
                }

                res.send(projects);
            });
        });

    api.get('/me', function(req, res) {
        res.send(req.decoded);
    });


    return api;

};