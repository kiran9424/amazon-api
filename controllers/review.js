const ReviewModel = require('../models/review');
const productModel = require('../models/product')

exports.postReview = async (req, res, next) => {
    try {
        const review = new ReviewModel();
        review.headLine = req.body.headLine;
        review.body = req.body.body;
        review.rating = req.body.rating;
        review.photo = req.file.location;
        review.user = req.user._id;
        review.productId = req.params.productId;

        await productModel.update({ $push: {reviews: review._id }});
        const savedReview = await review.save();

        if (savedReview) {
            res.status(200).json({ message: 'success', savedReview })
        }

    } catch (error) {
        res.status(200).json(error);
    }
}

exports.getReviews = async (req, res, next) => {
    try {
        const product = req.params.productId;
        const reviews = await ReviewModel.find({ productId: product }).populate('user').exec();
        res.status(200).json({ message: 'success', reviews })
    } catch (error) {
        res.status(200).json(error);
    }

}