const jwt = require('jsonwebtoken');

async function authToken (req, res,next) {
    try{
        const token = req?.cookies?.token;

        if(!token){
            return res.status(200).json({
                message : "Please Login ...",
                error : true,
                success : false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err,decoded){
            if(err){
                return res.json({
                    message : err.message || "You are not authorized",
                    error : true,
                    success : false
                });
            }

            req.userId = decoded?._id;
            next();
        })
    }
    catch(err){
        res.status(400).json({
            message : err.message || err,
            data : [],
            error : true,
            success : false
        });
    }
}

module.exports = authToken;