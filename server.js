// this code will 
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// const models = require('models');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// app.use((req, res, next)=>{
//    res.render('maintenance/maintenance.hbs');
// });

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err)
            console.log('unable to append log')
    });

    next();
});
// var test = home.homePage;

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcome: 'Welcome to my webpage!',
        pageTitle: 'Home Page',
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});


app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'You broke it!'
    });
});

app.get('/form', (req, res)=>{
    res.render('form.hbs', {
        pageTitle: 'Form',
    });
});
app.listen(3000, () => {
    console.log('server now started on port 3000');
    // console.log(JSON.stringify(test, undefined, 2));
});