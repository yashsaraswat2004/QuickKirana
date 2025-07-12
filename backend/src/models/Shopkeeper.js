const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const ShopkeeperSchema = new mongoose.Schema(
    {
        name: {
            type : String,
            required : [true, 'Please Provide a Name']
        },
        email: {
            type : String,
            required : [true, 'Please Provide an Email'],
            unique  : true,
            match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
        },
        password: {
            type: String,
            required: [true, 'Please Provide a Password'],
            minlength : 6
        },
        phone: {
            type: String,
            required: [true, 'Please Provide a Phone number']
        },
        shopName: {
            type : String,
            required: [true, 'Please Provide a Shop Name']
        },
        shopImage: {
            type: String,
            default: 'https://res.cloudinary.com/demo/image/upload/v1587611234/sample.jpg',
        },
        pincode: {
        type: String, 
        required: [true, 'Please provide a pincode'],
        length: [6, 'Pincode must be 6 digits'],
    },
    },
    {
        timestamps: true,
    }
)

ShopkeeperSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const Shopkeeper = mongoose.model('Shopkeeper', ShopkeeperSchema)
module.exports = Shopkeeper