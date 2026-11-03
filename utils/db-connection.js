
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'custom_db'
});

connection.connect((err) => {
    if (err) {
        console.log('Database connection failed:', err.message);
        return;
    }

    console.log('MySQL connected successfully');
});

const createQuery = `
    CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(255)
    )
`;

connection.query(createQuery, (err) => {
    if (err) {
        console.log('Table creation failed:', err.message);
        return;
    }

    console.log('Students table is ready');
});

module.exports = connection;
