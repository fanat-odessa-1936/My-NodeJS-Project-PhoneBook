const { Schema, SchemaTypes, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
      owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
}, { versionKey: false, timetamps: true });

const joiContactSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string()
        .pattern(/^[' '\-()0-9]{3,30}$/)
        .required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    joiContactSchema
}