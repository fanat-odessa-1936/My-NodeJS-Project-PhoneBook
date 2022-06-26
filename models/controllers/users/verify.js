const { NotFound } = require('http-errors');
const { User } = require('../../models');

const verify = async (req, res) => {
    const { verifyToken } = req.params;
    const user = await User.findOne({
        where: { verifyToken }
    });
    if (!user) {
        throw new NotFound('User not found')
    }
    await User.update({ verifyToken: null, verify: true }, {
        where: {id: user.get('id'), }
    });
    res.send("<h2>Verification successful</h2>")
};

module.exports = verify;
