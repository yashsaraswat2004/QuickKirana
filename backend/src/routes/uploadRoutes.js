const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Multer config: this tells multer to store the file in memory temporarily
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route   POST /api/upload
// @desc    Upload an image to Cloudinary
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded.' });
    }

    // Multer adds a 'file' object to the request.
    // We need to convert the file buffer to a base64 string
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto',
      folder: 'quick-kirana-shops', // Optional: folder in Cloudinary
    });

    // Send back the secure URL
    res.json({ url: result.secure_url });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error during upload.' });
  }
});

module.exports = router;