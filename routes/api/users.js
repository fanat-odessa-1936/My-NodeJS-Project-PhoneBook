const express = require('express');

const router = express.Router()

const { users: ctrl } = require('../../controllers');

const { joiUserSchema } = require("../../models/user");
const { validation, controllerWrapper, authenticate, upload } = require("../../middlewares");


const UserValidationMiddleware = validation(joiUserSchema);

router.post('/signup', UserValidationMiddleware, controllerWrapper(ctrl.signup));
router.post('/login', UserValidationMiddleware, controllerWrapper(ctrl.login));
router.post('/logout', authenticate, controllerWrapper(ctrl.logout));
router.get('/current', authenticate, UserValidationMiddleware, controllerWrapper(ctrl.getCurrent));
router.patch('/avatars', authenticate, upload.single("avatar"), controllerWrapper(ctrl.avatars));
router.get('/verify/:verifyToken', controllerWrapper(ctrl.verify));
router.post('/verify',UserValidationMiddleware, controllerWrapper(ctrl.reVerify));

module.exports = router;

