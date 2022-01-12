const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const acctSchema = new Schema({
    investment: { type: String, required: true },
    institution: { type: String, required: true },
    amount: { type: String, required: true }
}, { timestamps: true });


module.exports = mongoose.model('Account', acctSchema);