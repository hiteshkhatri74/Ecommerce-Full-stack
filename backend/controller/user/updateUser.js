const userModel = require("../../models/userModel");

async function updateUser(req,res){
    try{
        const sessionUser = req?.userId;
        const { userId, email, name, role } = req?.body;

        if(!sessionUser || !userId){
            return res.status(401).json({
                message : "something went wrong",
                success : false,
                error : true
            });
        }

        const payload = {
            ...( email && { email : email }),
            ...( name && { name : name }),
            ...( role && { role : role })
        };
        const user = await userModel.findById(sessionUser);

        if(!user){
            return res.json({
                message : "sessionUser not found",
                success : false,
                error : true
            });
        }

        const updateUser = await userModel.findByIdAndUpdate(userId, payload);

        res.json({
            data : updateUser,
            message : "User Updated",
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

module.exports = updateUser;