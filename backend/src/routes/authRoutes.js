const express = require('express')
const router = express.Router();
const {registerShopkeeper, loginShopkeeper} = require("../controllers/authController")
router.post('/register', registerShopkeeper);
router.post('/login', loginShopkeeper)

module.exports = router;