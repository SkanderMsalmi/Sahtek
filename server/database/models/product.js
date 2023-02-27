const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    category:{
        type:String,
    },
    description:{
        type:String,
    },
    stock:{
        type:Number,
    },
    price:{
        type:Number,
    },

});
module.exports=mongoose.model('product',productSchema);