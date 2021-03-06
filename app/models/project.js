/**
 * Created by addiittya on 21/11/15.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var projectSchema = new Schema({

    host: String,
    title: String,
    description: String,
    imageURL: String,
    created: {type: Date, default: Date.now()},
    cost: Number,
    full: Number

});

module.exports = mongoose.model('Project', projectSchema);
