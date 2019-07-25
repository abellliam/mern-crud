const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

let RATE = new Schema({
    date: { type: String },
    rate: { type: Number },
    eom_calc: { type: String }
});

module.exports = mongoose.model('RATE', RATE);