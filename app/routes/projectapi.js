/**
 * Created by addiittya on 03/12/15.
 */
var Project = require('../models/project');
var config = require('../../config');

module.exports = function (app, express){

    var api = express.Router();

    api.get('/', function(req, res){

        Project.find({}, function(err, projects){
            if(err){
                res.send(err);
                return;
            }
            res.json(projects);
        });

    });

    api.get('/:id', function(req, res){

            Project.findOne({ ngoid: req.params.ngoid }, function(req, obj){
                res.json(obj);
            });

    });

    return api;

};