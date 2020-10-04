const express = require('express');

const Category = require('../models/Category');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const adminCheck = require('../middleware/adminCheck');

//add a category
router.post('/categories', [
    adminCheck,
    check('name', 'Category name is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const category = new Category(req.body);
    try {
        await category.save();
        res.status(200).send(category);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//get all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).send(categories);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');

    }
})

module.exports = router;