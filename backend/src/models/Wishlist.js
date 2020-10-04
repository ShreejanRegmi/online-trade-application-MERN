const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    productAdded: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Furniture', 'Mobile', 'Computer', 'Vehicle']
    },
    addedOn: {
        type: Date,
        default: Date.now()
    }
});

wishlistSchema.index({
    addedBy: 1,
    productAdded: 1,
}, {
    unique: true,
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = Wishlist;