const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.genAuthToken = function(){
    const token = jwt.sign({email: this.email, password: this.password}, process.env.jwtPrivateKey);
    return token;
}

const User = mongoose.model('User', userSchema);

function userValidate(user) {
    const schema =  {
        name: Joi.string().required().trim(),
        email: Joi.string().required().trim().email(),
        password: Joi.string().required().trim()
    }
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = userValidate;