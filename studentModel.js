
const Joi = require('joi');
const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: { type: String, required: true },
    enrolled:{
        type:Boolean,
        default:false
    },
    // email: { type: String, required: true },
    phone: { type: String, required: true },
});

const student= new mongoose.model('student', studentSchemaSchema);

function validateData(student) {
    const schema = {
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(10).required(),
        enrolled:Joi.boolean().required()
    };
    return Joi.validate(student, schema);
}

exports.student = student;
exports.validate = validateData;