const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { course, validate } = require('../models/courseModel'); // Correctly importing course model and validate function
const { category } = require('../models/categoriesModel'); // Correctly importing category model

// GET route: Fetch all courses
router.get('/', async (req, res) => {
    const courses = await course.find();
    res.send(courses);
});

// POST route: Add a new course
router.post('/', async (req, res) => {
    // Validate the request body
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Find the category by ID
    const categoryData = await category.findById(req.body.categoryId);
    if (!categoryData) return res.status(400).send('Invalid category.');

    // Create a new course
    const newCourse = new course({
        title: req.body.title,
        category: {
            _id: categoryData._id,
            name: categoryData.name,
        },
        creator: req.body.creator,
        rating: req.body.rating,
    });

    // Save the course to the database
    await newCourse.save();
    res.send(newCourse);
});

// PUT route: Update an existing course
router.put('/:id', async (req, res) => {
    // Validate the request body
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Find the category by ID
    const categoryData = await category.findById(req.body.categoryId);
    if (!categoryData) return res.status(400).send('Invalid category.');

    // Update the course
    const updatedCourse = await course.findByIdAndUpdate(
        req.params.id, // Find the course by ID
        {
            title: req.body.title,
            category: {
                _id: categoryData._id,
                name: categoryData.name,
            },
            creator: req.body.creator,
            rating: req.body.rating,
        },
        { new: true } // Return the updated course
    );

    if (!updatedCourse) return res.status(404).send('The course with the given ID was not found.');
    res.send(updatedCourse);
});

// DELETE route: Remove a course
router.delete('/:id', async (req, res) => {
    const deletedCourse = await course.findByIdAndRemove(req.params.id);
    if (!deletedCourse) return res.status(404).send('The course with the given ID was not found.');
    res.send(deletedCourse);
});

// GET route: Fetch a course by ID
router.get('/:id', async (req, res) => {
    const singleCourse = await course.findById(req.params.id);
    if (!singleCourse) return res.status(404).send('The course with the given ID was not found.');
    res.send(singleCourse);
});

module.exports = router;
