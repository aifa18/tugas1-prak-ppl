# Tasks API (To-Do List Management)

**Nama:** Azmi Naifah Iftinah  
**NPM:** 140810230013  
**Mata Kuliah:** Praktikum Perangkat Lunak 1  
![CI/CS Status](https://github.com/aifa18/tugas1-prak-ppl/actions/workflows/main.yml/badge.svg)
---

## 1. Deskripsi Project
Tasks API adalah RESTful API sederhana yang dibangun menggunakan Node.js dan Express untuk melakukan manajemen data tugas (To-Do List). API ini menyediakan operasi CRUD (Create, Read, Update, Delete) secara komprehensif dan mengembalikan *response* dalam format JSON yang terstandardisasi. Proyek ini juga sudah terintegrasi penuh dengan ekosistem Docker dan GitHub Actions untuk keperluan CI/CS.

## 2. Dokumentasi API

### Endpoint List
* `GET /` → Root URL, otomatis melakukan *redirect* ke `/tasks`
* `POST /tasks` → Menambahkan tugas baru
* `GET /tasks` → Mengambil semua daftar tugas
* `GET /tasks/{id}` → Mengambil detail tugas berdasarkan ID
* `PUT /tasks/{id}` → Memperbarui data tugas (judul, deskripsi, atau status)
* `DELETE /tasks/{id}` → Menghapus tugas berdasarkan ID

### Format Response Standar

**Success Response (Contoh: GET /tasks/1) ✅**
```json
{
  "status": "OK",
  "data": {
    "id": 1,
    "title": "Mengerjakan Tugas PPL",
    "description": "Membuat RESTful API, Docker, dan CI/CS",
    "status": "pending"
  },
  "message": "Berhasil mengambil detail tugas",
  "errors": null
}
```

**Error Response (Contoh: POST /tasks tanpa title) ❌**
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Gagal menambahkan tugas",
  "errors": [
    "Title wajib diisi"
  ]
}
```

## 3. Panduan Instalasi (Docker)

Aplikasi ini sudah sepenuhnya di-containerization menggunakan Docker.

**Langkah Menjalankan Aplikasi:**
Pastikan Docker sudah terinstal, lalu jalankan perintah berikut di terminal:
```bash
docker-compose up --build
```

**Informasi Port:**
* **Host Port:** 3000
* **Container Port:** 3000
* API dapat diakses melalui browser atau alat pengujian (seperti curl/Postman) di: `http://localhost:3000/tasks`

## 4. Alur Kerja Git

Proyek ini menggunakan metode **Standard Feature Branch Flow** dengan struktur berikut:
* `main` → Branch utama untuk *production*
* `develop` → Branch integrasi dari berbagai fitur
* `feature/api-crud` → Branch spesifik tempat pengembangan fitur CRUD API dilakukan

**Bukti Penggunaan Conventional Commits:**
Setiap riwayat *commit* dalam repositori ini menggunakan format standar *Conventional Commits*, contohnya:
* `feat: add CRUD endpoints for task management`
* `feat: redirect root url to tasks endpoint`
* `feat: add Docker and docker-compose configuration`
* `feat: add unit testing and GitHub Actions workflow for CI/CS`
* `docs: add comprehensive project documentation`

## 5. Status Automasi (GitHub Actions)

Proyek ini mengimplementasikan CI/CS Pipeline yang berjalan otomatis setiap kali ada proses `push` atau `pull request` ke branch `main` dan `develop`.

* **CI (Continuous Integration):** Menjalankan *Unit Testing* menggunakan framework Jest dan Supertest untuk memastikan *endpoint* API (khususnya `GET /tasks`) merespons dengan status 200 dan format JSON yang benar.
* **CS (Continuous Security):** Menggunakan `gitleaks-action` untuk memindai repositori secara otomatis dan mendeteksi potensi kebocoran kredensial atau rahasia (*secrets*) di dalam kode.

---
**Checklist Pemenuhan Tugas**
- [x] CRUD API
- [x] RESTful Endpoint
- [x] JSON Response
- [x] Feature Branch Flow
- [x] Conventional Commits
- [x] Dockerfile
- [x] docker-compose
- [x] CI Pipeline (Jest)
- [x] Security Scan (Gitleaks)
- [x] Dokumentasi Lengkap