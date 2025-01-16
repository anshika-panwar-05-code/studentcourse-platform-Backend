const express = require('express');
const {category,validate}= require('../models/categoriesModel');

const router = express.Router();

// GET route
router.get('/', async (req, res) => {
    let categories = await category.find();
    res.send(categories);
});

// POST route
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const newCategory = new category({
        name: req.body.name
    });
    await newCategory.save();
    res.send(newCategory);
});

// PUT route
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updatedCategory = await category.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
    );

    if (!updatedCategory) return res.status(404).send('The category with the given ID was not found');
    res.send(updatedCategory);
});

// DELETE route
router.delete('/:id', async (req, res) => {
    const category = await category.findByIdAndRemove(req.params.id);
    if (!category) return res.status(404).send('The category with the given ID was not found');
    res.send(category);
});

// GET route by ID
router.get('/:id', async (req, res) => {
    const category = await category.findById(req.params.id);
    if (!category) return res.status(404).send('The category with the given ID was not found');
    res.send(category);
});

// Validation function
function validateData(category) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(category, schema);
}

module.exports = router;
