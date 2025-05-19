const userModel = require("../../models/userModel");
const stripe = require("../../config/stripe");

const paymentController = async (request, response) => {
    try{
        const { cartItems } = request?.body;
        const userId = request?.userId;

        if(!cartItems || !userId){
            return response.json({
                message : "Something went wrong",
                success : false,
                error : true
            });
        }

        const user = await userModel.findOne({ _id : userId });

        const params = {
            submit_type : 'pay',
            mode : "payment",
            payment_method_types : ['card'],
            billing_address_collection : 'auto',
            shipping_options : [
                {
                    shipping_rate : 'shr_1RBF87CkpkoQVgThOLb6afNw'
                }
            ],
            customer_email : user.email,
            metadata : {
                userId : userId
            },
            line_items : cartItems.map((item,index) => {

                return {
                     price_data : {
                        currency : 'inr',
                        product_data : {
                            name : item.productId.productName,
                            images : item.productId.productImage,
                            metadata : {
                                productId : item.productId._id
                            }
                        },
                        unit_amount : item.productId.sellingPrice * 100
                     },
                     adjustable_quantity : {
                        enabled : true,
                        minimum : 1
                     },
                     quantity : item.quantity
                }
            }),

            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url : `${process.env.FRONTEND_URL}/cancel`
        }

        const session = await stripe.checkout.sessions.create(params);
        response.status(303).json(session);
    }
    catch(err){
        response.json({
            message : err.message || err,
            success : false,
            error : true
        });
    }
}

module.exports = paymentController;