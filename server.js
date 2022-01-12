// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const acctController = require('./controllers/accounts');


const app = express();

require('dotenv').config();

app.set('view engine', 'ejs');

const { PORT = 3000, DATABASE_URL } = process.env;

// DATABASE CONNECTION
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

db
    .on('connected', () => console.log(`Connected to MongoDB on ${db.host}:${db.port}`))
    .on('disconnected', () => console.log(`Disconnected from MongoDB`))
    .on('error', (err) => console.log(`MongoDB Error: ${err.message}`));

// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.use('/portfolio', acctController);

// catch all route - typically used for handling our 404 page
app.get('/*', (req, res) => {
    res.render('404');
});



app.listen(PORT, () => {
    console.log(`Express is listening on port:${PORT}`);
});

