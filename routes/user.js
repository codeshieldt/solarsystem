const express = require('express');
const app = express();
const { User, validate } = require('../models/users')
const Joi = require('joi');
const bcrypt = require('bcrypt');

app.get('/', (req, res) => {
    return res.redirect('home.html')
});

app.post('/signup', async(req, res) => {

    const { error } = validate(res.body);
    if(error) return res.status(400).redirect('./signup_invalid.html');

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();
    const token = user.genAuthToken();
    res.header('token', token).redirect('./login.html');
});

app.post('/login', async(req, res) => {
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).redirect('./login_invalid.html');

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400). redirect('./login_invalid.html');

    const validPassword = bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).redirect('./login_invalid.html');

    res.redirect('./blog_login.html');
});

app.post('/posted', async(req, res) => {
    const blog = await findOne(res.body);

    blog = blog.save();

    res.redirect('./blog_login.html');
});

function loginValidation(req)
{
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }

    return Joi.validate(req, schema);
}

module.exports = app;