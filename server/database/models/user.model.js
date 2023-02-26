const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true
    },
    password:String
});

const UserModel = mongoose.model('user',userSchema);

module.exports = UserModel;