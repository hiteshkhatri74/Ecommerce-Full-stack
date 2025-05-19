const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req, res) => {
    try{
        const userId = req?.userId;

        if(!userId){
            return res.json({
                message : "User not Found",
                error : true,
                success : false
            });
        }

        const count = await addToCartModel.countDocuments({ userId : userId });

        res.json({
            data : { count : count },
            message : "Count product in addToCart",
            success : true,
            error : false
        });
    }
    catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success :  false
        });
    }
}

module.exports = countAddToCartProduct;