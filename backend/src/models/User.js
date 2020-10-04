const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        default: 'male',
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    facebook: {
        type: String,
        trim: true
    },
    instagram: {
        type: String,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    type: {
        type: String,
        default: 'user'
    },
    joinedOn: {
        type: Date,
        default: Date.now()
    },
    archived: {
        type: Boolean,
        default: false
    }
});

//furnitures virtual property
userSchema.virtual('furnitures', {
    ref: 'Furniture',
    localField: '_id',
    foreignField: 'addedBy'
})

//mobiles virtual property
userSchema.virtual('mobiles', {
    ref: 'Mobile',
    localField: '_id',
    foreignField: 'addedBy'
})

//computers virtual property
userSchema.virtual('computers', {
    ref: 'Computer',
    localField: '_id',
    foreignField: 'addedBy'
})

//vehicles virtual property
userSchema.virtual('vehicles', {
    ref: 'Vehicle',
    localField: '_id',
    foreignField: 'addedBy'
})

userSchema.virtual('wishlists', {
    ref: 'Wishlist',
    localField: '_id',
    foreignField: 'addedBy'
})

userSchema.methods.getToken = function () {
    const currentUser = this;
    const payload = {
        id: currentUser.id
    }
    const token = jwt.sign(payload, config.get('jwtKey'));
    currentUser.tokens = currentUser.tokens.concat({ token });
    currentUser.save();
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;