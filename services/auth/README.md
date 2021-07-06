# Clean TS Starter Kit

Starterkit untuk HTTP service yang dibangun dengan typescript + pendekatan clean-architecture.

## System Requirement

- `Node.js`: v14.17
- `PostgreSQL`: v13
- `Typescript`: v4.3.2

## Development

Berikut langkah-langkah untuk menjalankan program ini pada environment development:

1. Jalankan perintah `npm install` untuk meng-install depedencies.
2. Buat file `.env` pada root program. Contoh isi dari file `.env` dapat dilihat pada `.env.example`.
3. Jalankan perintah `npm run typeorm -- --migration:run` untuk melakukan migrasi basis data.
4. Jalankan perintah `npm run seed:run` untuk mengisi basis data dengan data yang sudah disediakan.
5. Jalankan perintah `npm run dev` untuk menjalankan server pengembangan.

Server pengembangan dapat diakses pada `http://localhost:4000` melalui browser.

### Dengan `docker-compose.dev.yml`

Di dalam proyek ini juga disediakan file `docker-compose.dev.yml` yang dapat digunakan untuk menjalankan service eksternal yang dibutuhkan oleh program ini dengan menggunakan Docker, yakni basis data PostgreSQL.

Gunakan perintah `docker-compose -f docker-compose.dev.yml up` untuk menjalankan service tersebut.

## Production

Berikut langkah-langkah untuk menjalankan program ini pada environment production:

1. Jalankan perintah `npm install` untuk meng-install depedencies.
2. Buat file `.env` pada root program. Contoh isi dari file `.env` dapat dilihat pada `.env.example`.
3. Pastikan nilai dari NODE_ENV pada file `.env` adalah `production`.
4. Jalankan perintah `npm run typeorm -- --migration:run` untuk melakukan migrasi basis data.
5. Jalankan perintah `npm run seed:run` untuk mengisi basis data dengan data yang sudah disediakan.
6. Jalankan perintah `npm run start` untuk menjalankan server production.

Server production dapat diakses pada `http://localhost:4000` melalui browser.

### Dengan `docker-compose.prod.yml`

Di dalam proyek ini juga disediakan file `docker-compose.prod.yml` yang dapat digunakan untuk menjalankan program ini dan basis data pada environment production dengan menggunakan Docker.

Gunakan perintah `docker-compose -f docker-compose.prod.yml up` untuk menjalankan service-service tersebut.

Ketika perintah di atas dijalankan, proses migrasi basis data akan dilakukan secara otomatis.

### Seed Data

Untuk mengisi basis data dengan data yang sudah disiapkan pada container Docker, gunakan perintah:

```sh
docker exec -it <container> npm run seed:run
```

Pastikan teks `<container>` diganti dengan id atau nama dari service container `app`, misal:

```sh
docker exec -it clean-ts-starterkit_app_1 npm run seed:run
```
