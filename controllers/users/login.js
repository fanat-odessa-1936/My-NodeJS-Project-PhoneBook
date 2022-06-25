const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: { email }
    });
    if (!user) {
            throw new Unauthorized("Email or password is wrong")
    }
    if (!user.verify) {
            throw new Unauthorized("Email not confirmed")
        }
        const hashPassword = user.password;
        const compareData = bcrypt.compareSync(password, hashPassword);
    if (!compareData) {
            throw new Unauthorized("Email or password is wrong")
    }

    const payload = {
        id: user._id
    }

    const { SECRET_KEY } = process.env;

    const token = jwt.sign(payload, SECRET_KEY)
    await User.update({token}, {
        where: {id: user._id}
    })
    res.json({
        token:token,
        User: {
        email: user.email,
        subscription: user.subscription
    }
        })
}

module.exports = login;
