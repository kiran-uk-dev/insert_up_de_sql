
const db = require('../utils/db-connection');

const addEntries = (req, res) => {
    const { email, name } = req.body;

    console.log('Request body:', req.body);
    console.log('Email:', email);
    console.log('Name:', name);

    if (!email || !name) {
        return res.status(400).send('Email and name are required');
    }

    const insertQuery = `
        INSERT INTO students (email, name)
        VALUES (?, ?)
    `;

    db.execute(insertQuery, [email, name], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err.message);
          
            return;
        }

        console.log('Value has been inserted');

        res.status(201).send(
            `Student with name ${name} successfully added`);
    });
};

const updateEntry = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    console.log("ID:", id);
    console.log("Name:", name);
    console.log("Email:", email);

    if (!id || !name || !email) {
        return res.status(400).send(
            "ID, name and email are required"
        );
    }

    // First check whether student exists
    const checkQuery = `
        SELECT * FROM students
        WHERE id = ?
    `;

    db.execute(checkQuery, [id], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        if (rows.length === 0) {
            return res.status(404).send("Student not found");
        }

        // Update student details
        const updateQuery = `
            UPDATE students
            SET name = ?, email = ?
            WHERE id = ?
        `;

        db.execute(updateQuery, [name, email, id], (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            }

            res.status(200).json({
                message: "Student has been updated successfully",
                student: {
                    id,
                    name,
                    email
                }
            });
        });
    });
};

const deleteEntry = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send('Student ID is required');
    }

    const deleteQuery = `
        DELETE FROM students
        WHERE id = ?
    `;

    db.execute(deleteQuery, [id], (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Student not found');
        }

        res.status(200).send('Student has been deleted');
    });
};

module.exports = {
    addEntries,
    updateEntry,
    deleteEntry
};
