const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//new addons for hosting
const port = process.env.PORT || 3000;

// connect to mongoDB
const dbURI = process.env.DATABASE;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('Connected to DB')
        app.listen(port);
    })
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.use(blogRoutes);

//redirects
app.get('/about-me', (req, res) => {
    res.redirect('/about');
});

// 404s
app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found' });
})