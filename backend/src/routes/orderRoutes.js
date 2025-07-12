const express = require('express')
const router = express.Router();
const {protect} = require('../middlewares/authMiddleware');
const {createOrder, getShopkeeperOrders, updateOrderStatus, trackOrderById, trackOrderByPhone} = require('../controllers/orderController')
router.post('/', createOrder)
router.get('/my-orders', protect, getShopkeeperOrders)
router.put('/:id', protect, updateOrderStatus)
router.get('/track/:id', trackOrderById);
router.get('/track/phone/:phone', trackOrderByPhone);
module.exports = router