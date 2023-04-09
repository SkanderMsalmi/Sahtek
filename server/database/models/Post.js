const mongoose = require('mongoose');
 

const post = new mongoose.Schema({
    description: String,
    time: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    like: Number,
    commentsCount: Number,
    // comments: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comment'
    // },]


 
})


module.exports = mongoose.model('Post',post);