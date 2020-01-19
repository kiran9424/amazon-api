const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    headLine:String,
    body:String,
    rating:Number,
    photo:String,
    productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
})

module.exports = mongoose.model('Review',reviewSchema);