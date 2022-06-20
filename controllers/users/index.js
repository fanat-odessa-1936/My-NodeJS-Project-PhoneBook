const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const getCurrent = require('./getCurrent');
const avatars = require('./avatars');
const verify = require('./verify');
const reVerify = require('./reVerify');


module.exports = {
    signup,
    login,
    logout,
    getCurrent,
    avatars,
    verify,
    reVerify
}