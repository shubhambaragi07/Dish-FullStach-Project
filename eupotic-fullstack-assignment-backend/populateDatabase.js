// populateDatabase.js
const mongoose = require('mongoose');
const Dish = require('./models/dish');

const dishes = [
  { dishId: "1", dishName: "Jeera Rice", imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/jeera-rice.jpg", isPublished: true },
  { dishId: "2", dishName: "Paneer Tikka", imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/paneer-tikka.jpg", isPublished: true },
  { dishId: "3", dishName: "Rabdi", imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/rabdi.jpg", isPublished: true },
  { dishId: "4", dishName: "Chicken Biryani", imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/chicken-biryani.jpg", isPublished: true },
  { dishId: "5", dishName: "Alfredo Pasta", imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/alfredo-pasta.jpg", isPublished: true }
];

mongoose.connect('mongodb://localhost:27017/dishesDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Database connected');
    await Dish.deleteMany({});
    await Dish.insertMany(dishes);
    console.log('Database populated');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
