const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const authenticate = require('../middleware/authenticate');
const { check, validationResult } = require('express-validator');


//add a wishlist
router.post('/wishlist', [
    authenticate,
    check('productAdded', 'Product ID is required').not().isEmpty(),
    check('onModel', "Item's model name is required").not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const wishlist = new Wishlist({
        ...req.body,
        addedBy: req.user._id
    })
    try {
        await wishlist.save();
        const wish = await Wishlist.findById(wishlist.id, '-_id -addedBy -__v').populate('productAdded');
        res.status(201).send(wish);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//get wishlists added by specific user with products
router.get('/wishlist', authenticate, async (req, res) => {
    try {
        const wishlists = await Wishlist.find({
            addedBy: req.user._id
        }, '-addedBy -__v').populate('productAdded', '-__v');
        return res.status(200).send(wishlists);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//remove one wish
router.delete('/wishlist/:prodId', authenticate, async (req, res) => {
    const prodId = req.params.prodId;
    try {
        const wish = await Wishlist.findOneAndDelete({
            productAdded: prodId,
            addedBy: req.user._id
        })
        if (!wish)
            return res.status(400).json({ msg: 'Error! You are not authorized or wish does not exist' });
        res.status(200).send(wish);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//remove all wishes
router.delete('/allWishlist', authenticate, async (req, res) => {
    try {
        await Wishlist.deleteMany({
            addedBy: req.user._id
        })
        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})
module.exports = router;