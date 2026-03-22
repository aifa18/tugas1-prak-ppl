# Menggunakan base image Node.js versi 20 
FROM node:20-alpine

# Menentukan direktori kerja di dalam container
WORKDIR /app

# Menyalin file konfigurasi package.json dan package-lock.json
COPY package*.json ./

# Menginstal semua library yang dibutuhkan
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]