const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/contacts');

const { joiContactSchema } = require("../../models/contact");
const { validation, authenticate} = require("../../middlewares");

const validationMiddleware = validation(joiContactSchema);

router.get('/',ctrl.getAll );

router.get('/:contactId', ctrl.getById);

router.post('/', authenticate, validationMiddleware, ctrl.add);

router.delete('/:contactId', ctrl.removeById);

router.put('/:contactId', authenticate, validationMiddleware, ctrl.updateById);

router.patch('/:contactId/favorite', ctrl.updateFavorite);

module.exports = router
