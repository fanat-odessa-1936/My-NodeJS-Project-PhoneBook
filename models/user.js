const { Schema, model } = require("mongoose")
const Joi = require("joi");

const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL:{
        type: String,
        default:""
    },
    verify: {
    type: Boolean,
    default: false,
  },
    verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, { versionKey: false, timestamps: true });

const joiUserSchema = Joi.object({
    password: Joi.string(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    subscription: Joi.string(),
    avatarURL: Joi.string(),
   
});

const User = model("user", userSchema);

module.exports = {
    User,
    joiUserSchema
}