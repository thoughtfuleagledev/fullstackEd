const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp')
    .then(() => {
        console.log('connection open');
    })
    .catch(err => {
        console.log(err)
    });


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive!']
    },
    onSale: {
        type:Boolean,
        default: false,
    },
    categories: [String],
    // categories: {
    //     type: String,
    //     default: 'Cycling'
    // },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
});

// productSchema.methods.greet = function() {
//     console.log('hello');
//     console.log(`- from ${this.name}`);
// }

// productSchema.methods.toggleOnSale = function() {
//     this.onSale = !this.onSale;
//     return this.save();
// }

// productSchema.methods.addCategory = function (newCat) {
//     this.categories.push(newCat);
//     return this.save();
// }

// productSchema.statics.fireSale = function () {
//     return this.updateMany({}, {onSale: true, price: 0})
// }

productSchema.statics.fireSale = function () {
    return this.updateMany({}, [{$set: {onSale: true, price: { $multiply: ["$price", 0.20] }}}]); // discounts all products by 80%
};


const Product = mongoose.model('Product', productSchema);

// const findProduct = async () => {
//     const foundProduct = await Product.findOne({name: 'Bike Helmet'});
//     // foundProduct.greet();
//     // foundProduct.onSale = !foundProduct.onSale;      MOVED TO SCHEMA
//     // foundProduct.save();
//     console.log(foundProduct);
//     await foundProduct.toggleOnSale();
//     console.log(foundProduct);
//     await foundProduct.addCategory('Outdoors');
//     console.log(foundProduct);
// }

// findProduct();

Product.fireSale().then(res => console.log(res));

// const bike = new Product({name: 'Cycling Jersey', price: 29, size: 'XS'})
// bike.save()
//     .then(data => {
//         console.log('it worked')
//         console.log(data);
//     })
//     .catch(err => {
//         console.log('error')
//         console.log(err);
//     })

// Product.findOneAndUpdate({name: 'Tire Pump'}, {price: -99}, {new: true, runValidators: true})
//     .then(data => {
//         console.log('it worked')
//         console.log(data);
//     })
//     .catch(err => {
//         console.log('error')
//         console.log(err);
//     })

