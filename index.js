const express = require('express');
const db = require('./utils/db-connection');
const studentRoute = require('./routes/studentsRouter');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello world');
});
app.use('/students', studentRoute);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
