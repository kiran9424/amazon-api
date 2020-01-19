const Product = require('../models/product')
const upload = require('../middlewares/upload-photo')

exports.createProduct = async (req, res, next) => {
    try {
        let product =  new Product();
        product.title = req.body.title
        product.description = req.body.description;
        product.photo = req.file.location;
        product.stockQuantity = req.body.stockQuantity;
        product.owner=req.body.ownerId,
        product.category=req.body.categoryId
        product.price = req.body.price
        await product.save();
        res.status(200).json({message:'product created successfully',product})
    } catch (error) {
        res.status(200).json(error);
    }

}

exports.getAllProduct = async (req,res,next)=>{
    try {
        let product = await Product.find().populate('owner category').populate('reviews','rating').exec();
        if(!product || product.length === 0){
            res.status(200).json({message:'products not found'})
        }
        res.status(200).json({message:'products fetched successfully',product})
    } catch (error) {
        res.status(200).json(error);
    }
}

exports.getSingleProduct = async (req,res,next)=>{
    try {
        let id = req.params.productId;
        let product = await Product.findOne({_id:id}).populate('owner category').exec();
        if(!product){
            res.status(200).json({message:'products not found'})
        }
        res.status(200).json({message:'products fetched successfully',product})
    } catch (error) {
        res.status(200).json(error);
    }
}

exports.updateSingleProduct = async (req,res,next)=>{
    try {
        let id = req.params.productId;
        const product = await Product.findOneAndUpdate({_id:id},{
            $set:{
                title : req.body.title,
                description : req.body.description,
                photo : req.file.location,
                stockQuantity : req.body.stockQuantity,
                owner:req.body.ownerId,
                category:req.body.categoryId,
                price:req.body.price
            }
        },
        {
            upsert:true
        })
        if(!product){
            res.status(200).json({message:'products not found to update'})
        }
        
        res.status(200).json({message:'product updated successfully',product})
    } catch (error) {
        res.status(200).json(error);
    }
}

exports.deleteSingleProduct = async (req,res,next)=>{
    try {
        let id = req.params.productId;
        let product = await Product.findOneAndRemove({_id:id});
        if(!product){
            res.status(200).json({message:'products not found'})
        }
        res.status(200).json({message:'products deleted  successfully'},{id:product._id,title:product.title})
    } catch (error) {
        res.status(200).json(error);
    }
}