// grab the packages that we need for the user model
var mongoose = require('mongoose');
mongoose.Promise = global.Promise // https://github.com/Automattic/mongoose/issues/4951
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// user schema
var Website_UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true, select: false },
    date: { type: Date, default: new Date() }
});

// hash the password before the user is saved
Website_UserSchema.pre('save', function(next) {
    var user = this;
    // hash the password only if the password has been changed or user is new
    if (!user.isModified('password')) return next();
    // generate the hash
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err);
        // change the password to the hashed version
        user.password = hash;
        next();
    });


});

// method to compare a given password with the database hash
Website_UserSchema.methods.comparePassword = function(password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
};


// return the model
module.exports = mongoose.model('WebsiteUser', Website_UserSchema);