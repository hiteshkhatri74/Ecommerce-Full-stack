const productModel = require("../../models/porductModel");

const filterProductController = async(req,res) => {
    try{
        const categoryList = req?.body?.category || [];

        const product = await productModel.find({
            category : {
                "$in" : categoryList
            }
        });

        res.json({
            message : "category product",
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

module.exports = filterProductController;