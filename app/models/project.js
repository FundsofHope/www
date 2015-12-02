/**
 * Created by addiittya on 21/11/15.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var projectSchema = new Schema({

    host: {type: Schema.Types.ObjectId, ref: 'Ngo'},
    title: String,
    desciption: String,
    created: {type: Date, default: Date.now()},
    cost: Number,
    full: Number

});

module.exports = mongoose.model('Project', projectSchema);