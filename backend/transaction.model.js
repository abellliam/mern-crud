const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

let TRANSACTION = new Schema({
    client_code: { type: String },
    date: { type: String },
    type: { type: String },
    amount: { type: Number }
});

module.exports = mongoose.model('TRANSACTION', TRANSACTION);