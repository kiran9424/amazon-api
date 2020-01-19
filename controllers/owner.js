const Owner = require('../models/owner');
exports.createOwner = async (req,res,next)=>{
    try {
        let owner = new Owner();
        owner.name = req.body.name;
        owner.about = req.body.about;
        owner.photo = req.file.location;
        await owner.save();
        res.status(200).json({message:'owner created successfully',owner})
    } catch (error) {
        res.status(200).json(error);
    }

}

exports.getAllOwner = async (req,res,next)=>{
    try {
        let owner = await Owner.find();
        if(!owner || owner.length === 0){
            res.status(200).json({message:'wners not found'})
        }
        res.status(200).json({message:'owner fetched successfully',owner})
    } catch (error) {
        res.status(200).json(error);
    }
}