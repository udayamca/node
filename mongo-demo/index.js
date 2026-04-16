const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
   .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
   },
   category: {
      type: String,
      required: true,
      enum: ['web', 'mobile'],
      lowercase: true,
      uppercase: false,
      trim: true
   },
   author: String,
   tags: {
      type: Array,
      // validate: { // Custom validator
      //    validator: function (v){
      //       return v && v.length > 0;
      //    },
      //    message: 'A course should have at least one value'
      // }
      validate: { // Promise Validator
         validator: function(v) {
            return new Promise((resolve) => {
               setTimeout(() => {
                  resolve(v && v.length > 0);
               }, 4000);
            });
         },
         message: 'A course should have at least one value'
      }
   },
   date: { type: Date, default: Date.now },
   isPublished: Boolean,
   price: {
      type: Number,
      required: function (){ return this.isPublished; },
      min: 10,
      max: 200,
      get: v => Math.round(v),
      set: v => Math.round(v)
   },
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
   const course = new Course({
      name: 'Angular Course',
      category: 'Web',
      author: 'Udaya',
      tags: ['frontend'],
      isPublished: true,
      price: 15.8
   });
   try {
      const result = await course.save();
      console.log(result);
   } catch(er) {
      for(field in er.errors) {
         console.log(er.errors[field].message);
      }
      // console.log(er.message);
   }
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

createCourse();

// getCourses();
