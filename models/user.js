const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    addresss: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }
})

UserSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,12);
    next();
})
UserSchema.methods.comparePassword = async function(userEnteredPassword,hashedPassword){
    return await bcrypt.compare(userEnteredPassword,hashedPassword);
}
module.exports = mongoose.model('User', UserSchema);