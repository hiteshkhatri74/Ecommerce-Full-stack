const productModel = require("../../models/porductModel");

const getProductDetails = async(req,res) => {
    try{
        const { productId } = req?.body;
        const product = await productModel.findById(productId);

        res.json({
            message : "Product details",
            data : product,
            success : true,
            error : false
        });
    }
    catch(err){
        res.json({
            message : err.message || err,
            success : false,
            error : true
        });
    }
}

module.exports = getProductDetails;