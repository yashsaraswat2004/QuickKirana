const jwt = require('jsonwebtoken')
const Shopkeeper = require('../models/Shopkeeper')

exports.protect = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.shopkeeper = await Shopkeeper.findById(decoded.shopkeeper.id).select('-password');
            next();
        } catch(err)
        {
            console.error(err);
            res.status(401).json({msg: "Not Authorized, Token Failed"});
            
        }
    }
    if (!token) {
    res.status(401).json({ msg: 'Not authorized, no token' });
    }
}