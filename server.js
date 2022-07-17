const express = require('express');
const mongoose = require('mongoose')
const morgan  = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// bring routes
const todoRoutes = require('./routes/todos')

const app  = express();
const PORT = process.env.PORT || 4000; 

//db 
mongoose
    .connect('mongodb://127.0.0.1:27017/helloworldapp',{ 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then( () => console.log('DB connected'))
    .catch( err => console.log(err));


// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

//routes middleware
app.use('/api/todos', todoRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})