const { BadRequest } = require('http-errors');
const { User } = require('../../models');
const sendMail = require('../../utils');

const reVerify = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new BadRequest ('missing required field email')
    }
    const user = await User.findOne({ email });
     if (!user) {
        throw new BadRequest ('user is not registered')
    }
    if (user.verify) {
        throw new BadRequest ('Verification has already been passed')
    }
    const data = {
        to: email,
        subject: 'Confirmation of registration',
        html: `<a href="http://localhost:3000/api/users/verify/${user.verifyToken}">Confirm registration</a>`
    };
    await sendMail(data);
    res.status(200).json({
        "message": "Verification email sent"
    })

}

module.exports = reVerify;