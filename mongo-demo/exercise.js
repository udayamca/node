const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
   .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.error('Could not connect to MongoDB...', err));
   
const courseSchema = new mongoose.Schema({
   _id: String,
   name: String,
   author: String,
   tags: [ String ],
   date: { type: Date, default: Date.now },
   price: Number,
   isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

// async function getCourses() {
//    const pageNumber = 1;
//    const pageSize = 10;
//    return courses =  await Course
//     //   .find({ tags: { $in: ['frontend', 'backend'] }, isPublished: true })
//     // .find({ isPublished: true })
//     // .or([{ tags: 'frontend' }, { tags: 'backend' }])
//     // .limit(pageSize)
//     //   .skip((pageNumber - 1) * pageSize)
//     //   .sort({ price: -1 })
//     //   .select({ name: 1, author: 1, price: 1 });
//     //   .countDocuments();
// //    console.log(courses);
//     .find({ isPublished: true})
//     .or([{ price: { $gte: 15 } }, { name: /.*by.*/ }])
//     .select({ name: 1, author: 1, price: 1 });

// }

// async function updateCourse(id) {
//   // Approach: Query first
//   // findById()
//   // Modify its properties
//   // save()
//   const course = await Course.findById(id);
//   if (!course) {
//      console.log('Course not found.');
//      return;
//   }
//   course.isPublished = true;
//   course.author = 'Another Author';
//   const result = await course.save();
//   console.log(result);
// }
// updateCourse('5a68fdd7bee8ea64649c2777');

// async function updateCourse(id) {
//    const result = await Course.findByIdAndUpdate(id);
//    if (!result) {
//       console.log('Course not found.');
//       return;
//    }
//    result.set({
//       author: 'kavin',
//       isPublished: false
//    });
//    console.log(result);
// }

// updateCourse('5a68fde3f09ad7646ddec17e');


async function removeCourse(id) {
   const result = await Course.findByIdAndDelete(id);
   console.log(result);
}

removeCourse('5a68fde3f09ad7646ddec17e');



// async function run() {
//    const courses = await updateCourse();
//    console.log(courses);
// }

// run();