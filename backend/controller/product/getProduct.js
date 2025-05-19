const productModel = require("../../models/porductModel");

const getProductController = async(req,res) => {
    try{
        const allProduct = await productModel.find().sort({ createdAt : -1 });
        
        res.json({
            message : "All Product",
            data : allProduct,
            success : true,
            error : false
        });
    }
    catch(err){
        res.status(400).json({
            message : err.message || err,
            success : false,
            error : true
        });
    }
}

module.exports = getProductController;