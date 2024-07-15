// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io('http://localhost:5000');

const App = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchDishes();
    socket.on('updateDishes', () => {
      fetchDishes();
    });

    return () => socket.off('updateDishes');
  }, []);

  const fetchDishes = async () => {
    const response = await axios.get('http://localhost:5000/api/dishes');
    setDishes(response.data);
  };

  const togglePublished = async (id) => {
    await axios.put(`http://localhost:5000/api/dishes/${id}/toggle`);
    fetchDishes();
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4"> Wel-Come To My  Dish Dashboard</h1>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Image</th>
            <th>Dish Name</th>
            <th>Published Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map(dish => (
            <tr key={dish.dishId}>
              <td><img src={dish.imageUrl} alt={dish.dishName} width="100" /></td>
              <td>{dish.dishName}</td>
              <td>{dish.isPublished ? 'Published' : 'Unpublished'}</td>
              <td>
                <button className="btn btn-primary" onClick={() => togglePublished(dish.dishId)}>
                  Toggle Publish Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
