const mongoose = require('mongoose');

const mobileSchema = new mongoose.Schema({
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
    brand: {
        type: String,
        required: true,
        trim: true
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
        lowercase: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    type: {
        type: String,
        default: "mobile"
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

const Mobile = mongoose.model('Mobile', mobileSchema);
module.exports = Mobile;