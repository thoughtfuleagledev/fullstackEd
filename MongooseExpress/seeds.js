const Product = require('./models/product');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log('mongo connection open')
    })
    .catch(err => {
        console.log('mongo connection error')
        console.log(err)
    });

const p = new Product({
    name: 'Ruby Grapefruit',
    price: 1.99,
    category: 'fruits'
});

// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(e => {
//         console.log(e)
//     });

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetables'
    },
    {
        name: 'Goddess Melon',
        price: 4.99,
        category: 'fruits'
    },
    {
        name: 'Mini Watermellon',
        price: 3.99,
        category: 'fruits'
    },
    {
        name: 'Celery',
        price: 1.50,
        category: 'vegetables'
    },
    {
        name: 'Chocolate Milk',
        price: 2.69,
        category: 'dairy'
    }
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    });