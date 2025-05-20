const bcrypt = require('bcryptjs');
const userModel = require("../../models/userModel");
const createToken = require('../../helpers/createToken');

async function userSignUpController(req,res) {
    try{
        const { email, password, name } = req?.body;

        if(!email || !password || !name){
            return res.json({
                message : "Please provide inputs",
                success : false,
                error : true
            });
        }

        const user = await userModel.findOne({ email });

        if(user){
            return res.json({
                message : "Already user exists",
                success : false,
                error : true
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            return res.json({
                message : "Something went wrong",
                error : true,
                success : false
            });
        }

        const payload = {
            email,
            name,
            role : "GENERAL",
            password : hashPassword
        }

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        const token = await createToken(saveUser);

        const tokenOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        res.cookie("token",token,tokenOption);

        res.status(201).json({
            message : "User created Successfully!",
            data : saveUser,
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

module.exports = userSignUpController;