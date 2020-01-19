const mongoose = require('mongoose');
//to populate the fields going in deeper level
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const orderSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    products:[
        {
            productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
            quantity:Number,
            price:Number
        }
    ],
    estimateDelivery:String
});

orderSchema.plugin(deepPopulate);
module.exports = mongoose.model('Order',orderSchema);