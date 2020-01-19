const mongoose = require('mongoose');
const algolia = require('mongoose-algolia');
const productSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
    },
    title: String,
    description: String,
    photo: String,
    price: Number,
    stockQuantity: Number,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
},
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });

productSchema.virtual('averageRating').get(function () {
    if (this.reviews.length > 0) {
        let sum = this.reviews.reduce((total, review) => {
            return total + review.rating;
        }, 0)

        return sum / this.reviews.length;
    }
    return 0;
})

productSchema.plugin(algolia, {
    appId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_KEY,
    indexName: process.env.ALGOLIA_INDEX,
    selector: 'title price rating averageRating owner',
    populate: {
        path: 'owner reviews'
    },
    debug: true
})

let Model = mongoose.model('Product', productSchema);
Model.SyncToAlgolia(); //Clears the Algolia index for this schema and synchronizes all documents to Algolia (based on the settings defined in your plugin settings)
Model.SetAlgoliaSettings({
  searchableAttributes: ['title'] //Sets the settings for this schema, see [Algolia's Index settings parameters](https://www.algolia.com/doc/api-client/javascript/settings#set-settings) for more info.
});
module.exports = Model