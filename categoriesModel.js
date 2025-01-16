
const Joi = require('joi');
const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    name: { type: String, required: true },
});

const category = new mongoose.model('category', categorySchema);



function validateData(category) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(category, schema);
}

exports.category = category;
exports.categorySchema = categorySchema;
exports.validate = validateData;