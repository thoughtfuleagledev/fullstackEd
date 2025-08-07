const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const mongoose = require('mongoose');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('database connected');
});

const app = express();
const path = require('path');
const { title } = require('process');

app.use(expressLayouts);
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds, title: 'All Campgrounds', showFooter: false});
});

app.use((req, res, next) => {
    // By default, show the footer for all routes
    res.locals.showFooter = true;
    next();
});

app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new', { title: 'Add Campground'});
});

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
});

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/details', { campground, title: `${campground.title} Camp Details`});
});

app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground, title: `Edit ${campground.title} Camp` });
});

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
});

app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});