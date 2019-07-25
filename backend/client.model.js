const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

let CLIENT = new Schema({
    client_code: { type: String },
    client_name: { type: String },
    address_1: { type: String },
    address_2: { type: String },
    address_3: { type: String },
    postcode: { type: Number },
    account_name: { type: String },
    account_no: { type: Number },
    TFN_1: { type: Number },
    TFN_2: { type: Number },
    investment: { type: String },
    balance: { type: Number },
    email: { type: String },
    as_of: { type: String },
    inactive: { type: Boolean },
    interest: { type: String },
    interest_month: { type: Number },
    interest_year: { type: Number }
});

module.exports = mongoose.model('CLIENT', CLIENT);