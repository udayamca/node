const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');


const Course = mongoose.model('Course', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    }
}));

// const courses = [
//     {id: 1, name: 'course1'},
//     {id: 2, name: 'course2'},
//     {id: 3, name: 'course3'}, 
// ]

router.get('/',async(req, res) => {
    //Calling mongoose
    const courses = await Course.find().sort('name');
    res.send(courses); 
});

// router.get('/', (req, res) => {
//     res.send(courses); 
// });

router.post('/', async (req, res) => {
    const { error } = validateCourse(req.body || {});
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const { name } = req.body;
    let courses = new Course({ name });
    courses = await courses.save();
    // courses.push(course);
    // console.log(courses);
    res.send(courses);
});

router.put('/:id', async (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = await Course.findByIdAndUpdate(req.params.id, { name: req.body.name}, {
        new: true
    })
    // const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }

    // course.name = req.body.name;
    res.send(course);
});

router.get('/:id', async (req, res) => {
   const course = await Course.findById(req.params.id);
//    const course = courses.find(c => c.id === parseInt(req.params.id));
   course ? res.send(course) : res.status(404).send('The course with the given ID was not found');
});

router.delete('/:id', async(req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    // const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }

    // const index = courses.indexOf(course);
    // courses.splice(index, 1);
    res.send(course);
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}

module.exports = router;
