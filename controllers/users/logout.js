const { Unauthorized } = require('http-errors');

const { User } = require('../../models');

const logout = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user._id, { token: null });
    if (!user) {
         throw new Unauthorized("Not authorized");
    }
    res.json({
        code: 204,
    })
};

module.exports = logout;