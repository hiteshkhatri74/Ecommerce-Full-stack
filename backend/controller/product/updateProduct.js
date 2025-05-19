const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/porductModel");

async function updateProductController(req,res){
    try{
        const sessionUserId = req?.userId;

        if(!sessionUserId){
            return res.json({
                message : "Something went wrong",
                success : true,
                error : false
            });
        }

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied");
        }

        const { _id, ...resBody } = req?.body;
        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody);

        res.json({
            message : "Product update successfully",
            data : updateProduct,
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

module.exports = updateProductController;