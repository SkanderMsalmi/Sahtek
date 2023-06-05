const mongoose = require('mongoose');


const community = new mongoose.Schema({


    name: String,
    createdAt: String,
    description: String,
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    }],

    creator :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    color: String,


})


module.exports = mongoose.model('Community', community);