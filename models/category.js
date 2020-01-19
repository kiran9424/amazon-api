const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    type:{
        type:String,
        unique:true,
        required:true
    }
});

module.exports = mongoose.model('Category',categorySchema);