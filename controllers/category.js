const Category = require('../models/category');

exports.createCategory = async (req,res,next)=>{
    try {
        let category = new Category();
        category.type = req.body.type;
        await category.save();
        res.status(200).json({message:'category created successfully',category})
    } catch (error) {
        res.status(200).json(error);
    }

}

exports.getAllCategory = async (req,res,next)=>{
    try {
        let category = await Category.find();
        if(!category || category.length === 0){
            res.status(200).json({message:'category not found'})
        }
        res.status(200).json({message:'category created successfully',category})
    } catch (error) {
        res.status(200).json(error);
    }
}