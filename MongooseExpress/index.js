const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');
const port = 3000;

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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const categories = ['fruits', 'vegetables', 'dairy', 'fungi', 'baked'];

// app.get('/products', async (req, res) => {
//     const products = await Product.find({});
//     // console.log(products)
//     res.render('products/index', {products, title: 'All Products'});
// });

// Category String Query
app.get('/products/category', async (req, res) => {
	const { category } = req.query;
	if(category) {
		const products = await Product.find({category})
		res.render('products/category', {products, title: category})
	} else {
        const products = await Product.find({})
        res.render('products/index', {products})
    }
});

// Categorized Products
app.get('/products', async (req, res) => {
    const products = await Product.find({});

    const categorizedProducts = {
        fruits: [],
        vegetables: [],
        dairy: [],
        fungi: [],
        baked: []
    };

    for (let product of products) {
        if (categorizedProducts[product.category]) {
            categorizedProducts[product.category].push(product);
        }
    }

    res.render('products/index', { products: { category: categorizedProducts }, title: 'All Products' });
});

// New Product
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories, title: 'New Product'});
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
});

// Product Details
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    // Product.findOne({_id: id});
    const product = await Product.findById(id);
    console.log(product);
    res.render('products/details', {product, title: product.name});
});

// Edit Product
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product, categories, title: `Edit ${product.name}`});
});

// Update Product
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${product._id}`);
});

// Delete Products
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products/');
})



app.listen(port, () => {
    console.log('app is listening on port 3000');
});