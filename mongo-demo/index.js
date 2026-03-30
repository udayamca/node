const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
   .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
   name: String,
   author: String,
   tags: [ String ],
   date: { type: Date, default: Date.now },
   price: Number,
   isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
   const course = new Course({
      name: 'Angular Course',
      author: 'Udaya',
      tags: ['angular', 'frontend'],
      isPublished: true,
      price: 15
   });

   const result = await course.save();
   console.log(result);
}

async function getCourses() {
   const pageNumber = 1;
   const pageSize = 10;
   const courses =  await Course
      .find({ author: 'Udaya', isPublished: true})
      // .find( { price: { $ge: 10, $lte: 20 } } )
      // .find({ price: { $in: [10, 15, 20] }})
      // .find()
      // .or([{author: 'Udaya'}, {isPublished: true} ])
      // Start with Udaya`
      // .find ({ author: /^Udaya/})
      //End with Udaya 
      // .find({author: /Udaya$/})
      // Contains Udaya (i indicates case-insensitive)
      // .find({author: /.*aya.*/i})
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize)
      .sort({ name: 1 })
      // .select({ name: 1, tags: 1 });
      .countDocuments();
   console.log(courses);
}

// createCourse();

getCourses();
