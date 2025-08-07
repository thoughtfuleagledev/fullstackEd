const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const path = require('path');
const redditData = require('./data.json');

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(expressLayouts);

app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/cats', (req, res) => {
    const cats = ['Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'];
    res.render('cats', { cats, title: 'Cats' });
});

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data, title: subreddit });
    } else {
        res.render('notfound', { subreddit, title: `Subreddit ${subreddit} Not Found` });
    }
});

app.get('/rand', (req, res) => {
    const rand = Math.floor(Math.random() * 10) + 1;
    res.render('random', { rand, title: 'Random' });
});

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000');
});