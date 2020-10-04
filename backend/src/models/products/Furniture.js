const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    soldFrom: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    type: {
        type: String,
        default: "furniture"
    },
    datePosted: {
        type: Date,
        default: Date.now()
    },
    archived: {
        type: Boolean,
        default: false
    },
    userArchived: {
        type: Boolean,
        default: false
    },
    images: [String]
});

const Furniture = mongoose.model('Furniture', furnitureSchema);
module.exports = Furniture;