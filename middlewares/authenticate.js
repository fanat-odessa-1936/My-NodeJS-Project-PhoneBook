const jwt = require('jsonwebtoken');
const { Unauthorized } = require('http-errors');

const { User } = require('../models');

const { SECRET_KEY } = process.env;
   
const authenticate = async (req, res, next) => {
    try {
        const [bearer, token] = req.headers.authorization.split(" ");
         if (bearer !== "Bearer") {
        throw new Unauthorized("Not authorized");
        }
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findOne({ id: id });
        if(!user){
            throw new Unauthorized("Not authorized");
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(error)
    }
}

module.exports = authenticate;
