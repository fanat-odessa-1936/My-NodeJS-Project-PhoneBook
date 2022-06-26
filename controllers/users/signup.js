const fs = require("fs/promises");
const bcrypt = require('bcryptjs');
const { Conflict } = require('http-errors');
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { User, sequelize } = require('../../models');
const path = require("path");

const avatarsDir = path.join(__dirname, "../../", "public/avatars");
const sendMail = require('../../utils');

const signup = async (req, res, _) => {
    const { email, password } = req.body;
    await User.sync();
    const userExist = await User.findOne({
        where: { email }
    });
    if (userExist) {
        throw new Conflict("Email in use")
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    const defaultAvatar = gravatar.url(email);
    const verifyToken = v4();
    const user = await User.create({ email, password: hashPassword, avatarURL: `https:${defaultAvatar}`,verifyToken });


    res.status(201).json({
        User: {
            email: user.email,
            subscription: user.subscription, 
            verifyToken
        }
    });
};

module.exports =  signup ;
