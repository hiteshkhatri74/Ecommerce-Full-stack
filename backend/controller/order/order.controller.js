const orderModel = require("../../models/orderProductModel");

const orderController = async (request, response) => {
    try{
        const currentUserId = request.userId;

        if(!currentUserId){
            return response.json({
                message : "Something went wrong",
                success : false,
                error : true
            });
        }

        const orderList = await orderModel.find({ userId : currentUserId }).sort({ createdAt : -1 });

        response.json({
            message : "Order List",
            data : orderList,
            success : true,
            error : false
        });
    }
    catch(err){
        response.status(500).json({
            message : err.message || err,
            error : true,
            success : false
        });
    }
}

module.exports = orderController;