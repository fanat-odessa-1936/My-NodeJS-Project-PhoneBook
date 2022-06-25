const { Unauthorized } = require('http-errors');

const { User } = require('../../models');

const logout = async (req, res) => {
    const user = await User.update({ token: null }, {
        where: {id: req.user._id}
    });
    if (!user) {
         throw new Unauthorized("Not authorized");
    }
    res.json({
        code: 204,
    })
};

module.exports = logout;
