const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let tasks = [];
let currentId = 1;

const formatResponse = (status, data, message, errors = null) => {
    return { status, data, message, errors };
};

// ==========================================
// ENDPOINT CRUD API
// ==========================================

// Root Endpoint: Langsung arahkan (redirect) pengunjung ke /tasks
app.get('/', (req, res) => {
    res.redirect('/tasks');
});

// 1. Create
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json(formatResponse("ERROR", null, "Gagal menambahkan tugas", ["Title wajib diisi"]));
    
    const newTask = { id: currentId++, title, description: description || "", status: "pending" };
    tasks.push(newTask);
    res.status(201).json(formatResponse("OK", newTask, "Tugas berhasil ditambahkan"));
});

// 2. Read All
app.get('/tasks', (req, res) => {
    res.status(200).json(formatResponse("OK", tasks, "Berhasil mengambil daftar tugas"));
});

// 3. Read by ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json(formatResponse("ERROR", null, "Tugas tidak ditemukan", ["ID tidak valid"]));
    res.status(200).json(formatResponse("OK", task, "Berhasil mengambil detail tugas"));
});

// 4. Update
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json(formatResponse("ERROR", null, "Tugas tidak ditemukan", ["ID tidak valid"]));

    const { title, description, status } = req.body;
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    res.status(200).json(formatResponse("OK", task, "Tugas berhasil diperbarui"));
});

// 5. Delete
app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).json(formatResponse("ERROR", null, "Tugas tidak ditemukan", ["ID tidak valid"]));

    tasks.splice(taskIndex, 1);
    res.status(200).json(formatResponse("OK", null, "Tugas berhasil dihapus"));
});

module.exports = app;

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server API berjalan di http://localhost:${port}`);
    });
}