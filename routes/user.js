const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {Email, emailValidate} = require('../models/email');

app.get('/', (req, res) => {
    return res.redirect('home.html')
});

app.post('/posted', async(req, res) => {
    const { error } = emailValidate(req.body);
    if(error) return res.redirect('./write_invalid.html');

    let email = new Email({
        email: req.body.email,
        text: req.body.text
    })

    email = await email.save();
    
    res.redirect('./blogs.html');
});

module.exports = app;