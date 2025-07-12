const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true
        },
        customerPhone: {
            type: String,
            required: true
        },
        shopkeeper: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Shopkeeper',
        },
        itemsDescription: {
            type: String,
            required: true
        },
        imageOfList: {
            type: String,
            default: ''
        },
        orderType: {
            type: String,
            enum: ['pickup', 'delivery'],
            required : true,
        },
        status: {
            type: String,
            enum: ['Recieved', 'Preparing', 'Ready For Pickup', 'Out for Delivery', 'Completed', 'Cancelled'],
            default: 'Recieved'
        },
        isUrgent: {
            type: Boolean,
            default: false,
        },
        paymentId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order