const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    stock: {
        type: Number,
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
    }

});
module.exports = mongoose.model('product', productSchema);