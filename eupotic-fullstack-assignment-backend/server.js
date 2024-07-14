// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Dish = require('./models/dish');
const http = require('http');
const { Server } = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/dishesDB', { useNewUrlParser: true, useUnifiedTopology: true }) 
  .then(() => console.log('Database connected'))
  .catch(err => console.error(err));

// Fetch list of dishes
app.get('/api/dishes', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Toggle isPublished status
app.put('/api/dishes/:id/toggle', async (req, res) => {
  try {
    const dish = await Dish.findOne({ dishId: req.params.id });
    if (!dish) {
      return res.status(404).send('Dish not found');
    }
    dish.isPublished = !dish.isPublished;
    await dish.save();
    io.emit('updateDishes');
    res.json(dish);
  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
io.on('connection', (socket) => {
    console.log('Client connected');
  });