/**
 * Created by addiittya on 07/10/15.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var ngoSchema = new Schema({

    name: String,
    ngoid: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true, select: false },
    email: String,
    phone: Number,
    profile: String,
    address: String

});

ngoSchema.pre('save', function (next) {

    var ngo = this;

    if(!ngo.isModified('password')) return next();

    bcrypt.hash(ngo.password, null, null, function(err, hash){

        if(err) return next(err);

        ngo.password = hash;
        next();

    });

});

ngoSchema.methods.comparePass = function(password) {

    var ngo = this;

    return bcrypt.compareSync(password, ngo.password);

};

module.exports = mongoose.model('Ngo', ngoSchema);