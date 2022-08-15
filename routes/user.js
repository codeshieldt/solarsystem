const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.redirect('home.html')
});

module.exports = app;