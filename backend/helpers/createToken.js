const jwt = require('jsonwebtoken');

const createToken = async (user) => {
    const tokenData = {
         _id : user._id,
        email : user.email
    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn : 60 *60 * 8 });
    return token;
}

module.exports = createToken;