const mongoose = require('mongoose');

const computerSchema = new mongoose.Schema({
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
    brand: {
        type: String,
        required: true,
        trim: true
    },
    condition: {
        type: String,
        required: true,
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
        default: "computer"
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

const Computer = mongoose.model('Computer', computerSchema);
module.exports = Computer;