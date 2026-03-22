const request = require('supertest');
const app = require('./index');

describe('Tasks API CRUD Testing Terlengkap', () => {
    let taskId; // Variabel bantuan untuk menyimpan ID tugas yang akan dites

    // 1. Test Create (POST)
    it('Seharusnya membuat tugas baru (POST /tasks)', async () => {
        const res = await request(app).post('/tasks').send({
            title: 'Mengerjakan Unit Test',
            description: 'Membuat test lengkap seperti teman'
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBe('OK');
        expect(res.body.data.title).toBe('Mengerjakan Unit Test');
        
        taskId = res.body.data.id; // Simpan ID untuk tes selanjutnya
    });

    it('Seharusnya gagal jika title kosong (POST /tasks)', async () => {
        const res = await request(app).post('/tasks').send({ description: 'Kosong nih' });
        expect(res.statusCode).toBe(400);
        expect(res.body.status).toBe('ERROR');
    });

    // 2. Test Read All (GET)
    it('Seharusnya mengambil semua daftar tugas (GET /tasks)', async () => {
        const res = await request(app).get('/tasks');
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    // 3. Test Read by ID (GET)
    it('Seharusnya mengambil detail tugas berdasarkan ID (GET /tasks/:id)', async () => {
        const res = await request(app).get(`/tasks/${taskId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.id).toBe(taskId);
    });

    // 4. Test Update (PUT)
    it('Seharusnya memperbarui data tugas (PUT /tasks/:id)', async () => {
        const res = await request(app).put(`/tasks/${taskId}`).send({
            status: 'completed'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.data.status).toBe('completed');
    });

    // 5. Test Delete (DELETE)
    it('Seharusnya menghapus tugas (DELETE /tasks/:id)', async () => {
        const res = await request(app).delete(`/tasks/${taskId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Tugas berhasil dihapus');
    });

    // 6. Test Error Handling (GET 404)
    it('Seharusnya mengembalikan 404 karena tugas sudah dihapus', async () => {
        const res = await request(app).get(`/tasks/${taskId}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.status).toBe('ERROR');
    });
});