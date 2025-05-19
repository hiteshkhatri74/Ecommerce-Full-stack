const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/porductModel");

async function UploadProductController(req, res) {
    try{
        const sessionUserId = req?.userId;

        if(!sessionUserId){
            return res.json({
                message : "Something went wrong",
                success : false,
                error : true
            });
        }

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied");
        }

        const uploadProduct = new productModel(req.body);
        const saveProduct = await uploadProduct.save();

        res.status(201).json({
            message : "Product upload successfully",
            data : saveProduct,
            success : true,
            error : false
        });
    }
    catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        });
    }
}

module.exports = UploadProductController;