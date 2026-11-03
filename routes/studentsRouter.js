const express = require('express');
const studentController = require('../controller/studentController');

const route = express.Router();

route.post('/add', studentController.addEntries);

route.put('/update/:id', studentController.updateEntry);

route.delete('/delete/:id', studentController.deleteEntry);

module.exports = route;