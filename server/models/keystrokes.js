// grab the packages that we need for the user model
var mongoose = require('mongoose');
mongoose.Promise = global.Promise // https://github.com/Automattic/mongoose/issues/4951
var Schema = mongoose.Schema;


// user schema
var KeystrokeSchema = new Schema({
    admin: { type: String, required: true }, // reference to username of user.js model
    subject: { type: String, required: true }, // the subject whose keystroke data belong to
    keystroke_code: { type: [Number], required: true },
    keystroke_dt: { type: [Number], required: true },
    date: { type: Date, default: new Date() },
});




// return the model
module.exports = mongoose.model('KeystrokeDataModel', KeystrokeSchema);