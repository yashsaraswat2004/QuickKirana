const Shopkeeper = require('../models/Shopkeeper')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registerShopkeeper = async(req, res) => {
    const {name, email, password, phone, shopName, pincode, shopImage} = req.body;
    try {
        let shopkeeper = await Shopkeeper.findOne({email});
        if(shopkeeper){
            return res.status(400).json({msg : "Shopkeeper already Exists"})
        }
        shopkeeper = new Shopkeeper({name, email, password, phone, shopName, pincode, shopImage});
        await shopkeeper.save();

        res.status(201).json({msg: "Shopkeeper Registered Successfully"})
    } catch(err)
    {
        console.error(err.message);
        res.status(500).json({msg: "Server Error"})
    }
}

exports.loginShopkeeper = async (req, res) => {
    const {email, password} = req.body;
    try {
        const shopkeeper = await Shopkeeper.findOne({email})
        if(!shopkeeper)
        {
            return res.status(401).json({msg: "Invalid Credentials"})
        }
        const isMatchPass = await bcrypt.compare(password, shopkeeper.password);
        if(!isMatchPass)
            return res.status(400).json({msg: "Incorrect Password"})

        const payload = {
            shopkeeper : {
                id: shopkeeper.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: '5h'},
            (err, token) => {
                if(err) throw err;
                res.json({token});
            }
        )
    } catch(err){
        console.error(err.message)
        res.status(500).json({msg: 'Server Error'})
}
}