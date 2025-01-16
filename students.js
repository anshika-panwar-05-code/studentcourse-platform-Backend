const express = require('express');
const router = express.Router();
const {student,validate}= require('../models/studentModel');



// GET route
router.get('/', async (req, res) => {
    let student = await student.find();
    res.send(student);
});

// POST route
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const newstudent = new student({
        name: req.body.name,
       enrolled:req.body.enrolled,
        phone: req.body.phone
    });

    await newstudent.save();
    res.send(newstudent);
});

// PUT route
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updatedstudent = await student.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name ,enrolled:req.body.enrolled,phone:req.body.phone},
        { new: true }
    );

    if (!updatedstudent) return res.status(404).send('The category with the given ID was not found');
    res.send(updatedstudent);
});

// DELETE route
router.delete('/:id', async (req, res) => {
    const student = await student.findByIdAndRemove(req.params.id);
    if (!student) return res.status(404).send('The category with the given ID was not found');
    res.send(student);
});

// GET route by ID
router.get('/:id', async (req, res) => {
    const student = await student.findById(req.params.id);
    if (!student) return res.status(404).send('The category with the given ID was not found');
    res.send(student);
});



module.exports = router;
