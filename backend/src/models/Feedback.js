const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    lastname: {
        type: String,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    reviewed: {
        type: Boolean,
        default: false
    },
    datePosted: {
        type: Date,
        default: Date.now()
    }
})

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;