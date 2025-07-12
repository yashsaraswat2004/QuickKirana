// upload-static-assets.js
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configure Cloudinary (same as your backend)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadStaticAssets = async () => {
  try {
    const publicDir = path.join(__dirname, 'frontend', 'public');
    
    // Upload QK.png
    const logoResult = await cloudinary.uploader.upload(
      path.join(publicDir, 'QK.png'),
      {
        public_id: 'static-assets/QK-logo',
        folder: 'quick-kirana-static',
        resource_type: 'image',
      }
    );
    
    // Upload Shopping.png
    const shoppingResult = await cloudinary.uploader.upload(
      path.join(publicDir, 'Shopping.png'),
      {
        public_id: 'static-assets/Shopping-illustration',
        folder: 'quick-kirana-static',
        resource_type: 'image',
      }
    );
    
    console.log('✅ Upload successful!');
    console.log('Logo URL:', logoResult.secure_url);
    console.log('Shopping Image URL:', shoppingResult.secure_url);
    
    // Save URLs to a file for easy reference
    const urls = {
      logo: logoResult.secure_url,
      shopping: shoppingResult.secure_url,
    };
    
    fs.writeFileSync('./cloudinary-urls.json', JSON.stringify(urls, null, 2));
    console.log('📄 URLs saved to cloudinary-urls.json');
    
  } catch (error) {
    console.error('❌ Upload failed:', error);
  }
};

uploadStaticAssets();
