const userModel = require("../../models/userModel");
const orderModel = require("../../models/orderProductModel");

const allOrderController = async (request, response) => {
    try{
       const userId = request?.userId;

       if(!userId){
        return response.json({
            message : "Something went wrong",
            success : false,
            error : true
        });
       }

       const user = await userModel.findById(userId);

       if(user.role !== 'ADMIN'){
         return response.status(500).json({
            message : "not access",
            success : false,
            error : true
         });
       }

       const AllOrder = await orderModel.find().sort({ createdAt : -1 });

       return response.status(200).json({
            message : "All orders",
            data : AllOrder,
            success : true,
            error : false
       });
    }
    catch(err){
        response.json({
            message : err.message || err,
            error : true,
            success : false
        });
    }
}

module.exports = allOrderController;