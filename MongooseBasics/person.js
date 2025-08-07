const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp')
    .then(() => {
        console.log('connection open');
    })
    .catch(err => {
        console.log(err)
    });

const personSchema = new mongoose.Schema({
    first: String,
    last: String
});

personSchema.virtual('fullName').
    get(function () {return `${this.first} ${this.last}`;});
    // .set(function(v) {
    //     this.name.first = v.substr(0, v.indexOf(' '));
    //     this.name.last = v.substr(v.indexOf(' ') + 1);
    // });

personSchema.pre('save', async function () {
    // this.first = 'Yo';
    // this.last = 'Mama';
    console.log('about to save');
});

personSchema.post('save', async function () {
    console.log('just saved');
});

const Person = mongoose.model('Person', personSchema);


