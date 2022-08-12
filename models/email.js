const Joi = require('joi');
const mongoose = require('mongoose');

const Email = mongoose.model('Blog', new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    }
}));

function emailValidate(mail)
{
    const schema = {
        email: Joi.string().email().required(),
        text: Joi.string().required()
    }

    return Joi.validate(mail, schema);
}

module.exports.Email = Email;
module.exports.emailValidate = emailValidate;