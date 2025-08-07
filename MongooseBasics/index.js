const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp')
    .then(() => {
        console.log('connection open');
    })
    .catch(err => {
        console.log(err)
    });

// {
//     title: 'Click',
//     year: 2004,
//     score: 8.4,
//     rated: 'PG'
// }

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

const Movie = mongoose.model('Movie', movieSchema)
const click = new Movie({title: 'Click', year: 2004, score: 8.4, rating: 'PG'})