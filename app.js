const express = require('express');
const mongoose = require('mongoose');
const categories = require('./Router/categories');
const students = require('./Router/students');
const app = express();

mongoose.connect('mongodb://localhost/learingplatform')
.then(()=> console.log('Connected to MongoDB'))
.catch(err=>console.error('Could not connect to MongoDB',err));

app.use(express.json());
app.use( '/api/categories',categories);  
app.use('/api/students',students);



app.listen(3001, () => {
    console.log('Listening on port 3001');
});
