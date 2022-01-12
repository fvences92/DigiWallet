const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const acctSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    completed: { type: Boolean, default: false }
}, { timestamps: true });


module.exports = mongoose.model('Account', acctSchema);