const Order = require('../models/Order')
const Shopkeeper = require('../models/Shopkeeper')

exports.createOrder = async (req, res) => {
    const {customerName, customerPhone, itemsDescription, orderType, shopkeeperId, imageOfList } = req.body; 
    try{
        const shopkeeper = await Shopkeeper.findById(shopkeeperId);
        if(!shopkeeper)
        {
            return res.status(404).json({msg: "Shopkeeper not found"})
        }
        const newOrder = new Order(
            {
                customerName,
                customerPhone,
                itemsDescription,
                orderType,
                shopkeeper: shopkeeperId,
                imageOfList,
            }
        );

        const order = await newOrder.save();
        res.status(201).json(order);
    } catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Server Error'})
        
    }
}


exports.getShopkeeperOrders = async(req, res) => {
    try{
        const orders = await Order.find({shopkeeper: req.shopkeeper.id}).sort({ createdAt : -1});
        res.json(orders);
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Server Error'})
        
    }
}

exports.updateOrderStatus = async(req, res) => {
    const {status} = req.body;
    try{
        let order = await Order.findById(req.params.id)
        if(!order) return res.status(404).json({msg: "Order not found"});
        if(order.shopkeeper.toString() != req.shopkeeper.id) return res.status(401).json({msg: 'User not authorized'});

        order.status = status;
        await order.save();
        res.json(order);
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send({msg: 'Server Error'});
        
    }
}

exports.trackOrderById = async (req, res) => {
  try {
    // We use .populate() to also get the shopkeeper's name from the reference
    const order = await Order.findById(req.params.id).populate('shopkeeper', 'shopName');
    
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    res.json({
      _id: order._id,
      status: order.status,
      shopkeeper: order.shopkeeper,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.trackOrderByPhone = async (req, res) => {
  try {
    // Find the most recent order associated with a phone number
    const order = await Order.findOne({ customerPhone: req.params.phone })
      .sort({ createdAt: -1 }) // Get the latest one
      .populate('shopkeeper', 'shopName');
      
    if (!order) {
      return res.status(404).json({ msg: 'No orders found for this phone number' });
    }
    res.json({ _id: order._id, status: order.status, shopkeeper: order.shopkeeper });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};