const Joi = require('joi');
const mongoose = require('mongoose');
const { categorySchema } = require('./categoriesModel'); // Ensure correct path

// Define the course schema
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
    },
    category: {
        type: categorySchema, // Embed the category schema
        required: true,
    },
    creator: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5, // Assuming ratings are between 0 and 5
    },
});

// Create the course model
const course = mongoose.model('course', courseSchema);

// Validation function
function validateData(course) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        categoryId: Joi.string().required(), // Expect the category ID in the payload
        creator: Joi.string().required(),
        rating: Joi.number().min(0).max(5).required(),
    });
    return schema.validate(course);
}

// Export the model and validation function
exports.course = course;
exports.validate = validateData;
