const mongoose = require('mongoose');
// const { collection } = require('./userModel');

const productSchema = mongoose.Schema({
    productName : String,
    brandName : String,
    category : String,
    productImage : [],
    description : String,
    price : Number,
    sellingPrice : Number
},{
    timestamps : true,
    // collection : 'products'
});


const productModel = mongoose.model("product",productSchema);

module.exports = productModel;