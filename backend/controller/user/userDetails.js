const userModel = require("../../models/userModel");

async function userDetailsController(req,res){
    try{
        const userId = req?.userId;

        if(!userId){
            return res.json({
                message : "Something went wrong",
                success : false,
                error : true
            });
        }

        const user = await userModel.findById(userId);

        if(!user){
            return res.json({
                message : "User not found",
                success : false,
                error : true
            });
        }

        res.status(200).json({
            message : "User Details",
            data : user,
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

module.exports = userDetailsController;