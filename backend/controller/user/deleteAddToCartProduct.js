const addToCartModel = require("../../models/cartProduct");

const deleteAddToCartProduct = async(req,res) => {
    try{
        const currentUserId = req?.userId;
        const addToCartProductId = req?.body._id

        if(!currentUserId || !addToCartProductId){
            return res.json({
                message : "Something went wrong",
                error : true,
                success : false
            });
        }

        const deleteProduct = await addToCartModel.deleteOne({ _id : addToCartProductId });

        res.json({
            message : "Product Deleted From Cart",
            data : deleteProduct,
            success : true,
            error : false
        });
    }
    catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        });
    }
}

module.exports = deleteAddToCartProduct;