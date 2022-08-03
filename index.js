const mongoose = require('mongoose');
const express = require('express');
const app = express();
const route = require('./routes/user')

mongoose.connect('mongodb://localhost:27017/blog')
    .then(() => {console.log('Connected to MongoDB...')})
    .catch((ex) => {console.log(ex)});


const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/', route);


app.listen(port, () => {console.log(`Server listening ${port}`)});