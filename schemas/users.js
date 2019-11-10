'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    channelId: String,
    userId: String,
    searches: [{
        intent: String,
        message: String
    }],

});

module.exports = mongoose.model('users', userSchema);