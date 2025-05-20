const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../../models/userModel');
const createToken = require('../../helpers/createToken');

async function userSignInController(req, res){
    try{
        const { email ,password } = req?.body;
        console.log("email and password in backend", email,password);

        if(!email || !password){
            return res.json({
                message : "Please provide inputs",
                error : true,
                success : false
            });
        }

        const user = await userModel.findOne({ email });

        if(!user){
            return res.json({
                message : "Email or Password incorrect",
                error : true,
                success : false
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword){
            return res.json({
                message : "Email or Password incorrect",
                error : true,
                success : false
            });
        }

        const token = await createToken(user);
        const tokenOption = {
            httpOnly : true,
            secure : true,
            sameSite : None
        }
        res.cookie("token",token,tokenOption);
        
        res.status(200).json({
            message : "Login successfully",
            data : token,
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

module.exports = userSignInController;