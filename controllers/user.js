const UserModel = require('../models/user');

exports.getProfile = async (req,res,next)=>{
    try {
        const user = await UserModel.findOne({_id:req.user._id});
        if(!user){
            res.status(403).json({ status: 'fail', message: 'user not found' })
        }
        res.status(200).json({success:'true',user:req.user})
        
    } catch (error) {
        res.status(200).json(error);  
    }
}