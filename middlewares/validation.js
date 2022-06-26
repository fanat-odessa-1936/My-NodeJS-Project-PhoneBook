const { BadRequest } = require('http-errors');

const validation = (schema) => {
    validationFunc = (req, _, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
           throw new BadRequest()
        }
        next();
    }
    return validationFunc;
}


module.exports = validation;
