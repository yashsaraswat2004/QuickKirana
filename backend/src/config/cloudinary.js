const cloudinary = require('cloudinary')
require('dotenv').config();

const connectCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    })
    console.log('☁️  Cloudinary Connected...');
}

module.exports = connectCloudinary