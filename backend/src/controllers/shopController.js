const Shopkeeper = require('../models/Shopkeeper');
exports.getShops = async (req, res) => {
try{
    const {pincode} = req.query;
    const query = pincode? {pincode} : {};
    const shops = await Shopkeeper.find(query).select('-password');
    res.json(shops);
} catch(err){
    console.error(err.message);
    res.status(500).json({msg: "Server Error"});
}
}


exports.getShopById = async (req, res) => {
  try {
    const shop = await Shopkeeper.findById(req.params.id).select('-password');

    if (!shop) {
      return res.status(404).json({ msg: 'Shop not found' });
    }

    res.json(shop);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Shop not found' });
    }
    res.status(500).send('Server Error');
  }
};