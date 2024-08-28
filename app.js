const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

// Vazifalarni olish
app.get('/tasks/:status', (req, res) => {
    const status = req.params.status;
    db.all("SELECT * FROM tasks WHERE status = ?", [status], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Vazifa qo'shish
app.post('/tasks/incomplete', (req, res) => {
    const { name, family, formula, type, color } = req.body;
    if (!name || !family || !formula || !type || !color) {
        return res.status(400).json({ error: "All task fields are required" });
    }
    db.run("INSERT INTO tasks (name, family, formula, type, color, status) VALUES (?, ?, ?, ?, ?, 'incomplete')", [name, family, formula, type, color], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ id: this.lastID });
    });
});

// Vazifani bajarildi deb belgilash
app.patch('/tasks/complete', (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: "Task ID is required" });
    }
    db.run("UPDATE tasks SET status = 'complete' WHERE id = ?", [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).send("Task marked as complete");
    });
});

// Vazifani o'chirish
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM tasks WHERE id = ?", [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).send("Task deleted");
    });
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
