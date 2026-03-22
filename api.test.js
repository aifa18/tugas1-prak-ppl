const request = require('supertest');
const app = require('./index');

describe('Tasks API CI Testing', () => {
    it('Seharusnya mengembalikan status 200 dan array kosong saat memanggil GET /tasks', async () => {
        const res = await request(app).get('/tasks');
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toEqual([]);
        expect(res.body.message).toEqual("Berhasil mengambil daftar tugas");
    });
});