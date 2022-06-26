const sgMail = require("@sendgrid/mail");
const { NotFound } = require('http-errors');

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
    try {
        const mail = { ...data, from: 'Doogmatix91@meta.ua' }
        await sgMail.send(mail);
        return true
    }
    catch (error) {
       throw new NotFound("User not found")
    }
}

module.exports = sendMail;

