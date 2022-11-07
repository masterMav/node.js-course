const express = require('express');

const app = express();

// register view engine
app.set('view engine', 'ejs');

app.listen(3000);

app.get('/', (req, res) => {

    const blogs = [
        { title: 'Mav', snippet: 'This is Mav ka blog' },
        { title: 'Sam', snippet: 'This is Sam ka blog' },
        { title: 'Damn', snippet: 'This is Damn ka blog' }
    ]

    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
})

//redirects
app.get('/about-me', (req, res) => {
    res.redirect('/about');
});

// 404s
app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found' });
})