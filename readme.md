# API REST en JavaScript con Express y PostgreSQL

Desarrollo de una API Rest siguiendo un enfoque de Programación Orientada a Objetos (POO). Esta API permitirá gestionar autores y libros, con la relación "un autor puede tener varios libros".

## Estructura de los archivos
```
api-autores-libros/
│
├── config/
│   └── db.js
│
├── models/
│   ├── Autor.js
│   └── Libro.js
│
├── controllers/
│   ├── autorController.js
│   └── libroController.js
│
├── routes/
│   ├── autorRoutes.js
│   └── libroRoutes.js
│
├── app.js
├── server.js
├── package.json
└── .env
```

## 🧰 Requisitos previos
1. Node.js
1. PostgreSQL
1. Un cliente como Postman o Thunder Client para probar las rutas

# Creación del proyecto
### ✅ Paso 1: Inicializar el proyecto
```bash
mkdir api-autores-libros
cd api-autores-libros
npm init -y
npm install express dotenv cors helmet morgan pg
```
Instalar también sequelize para manejar modelos de forma más limpia con POO.
```bash
npm install sequelize
```

### 🗂️ Paso 2: Archivo .env
```
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=db_autores_libros
DB_PORT=5432
PORT=3000
```

### 🛠️ Paso 3: Configuración de la base de datos (config/db.js)
```javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = pool;
```

### 📚 Paso 4: Modelos
* models/Autor.js
* models/Libro.js

### 🎮 Paso 5: Controladores
* controllers/autorController.js
* controllers/libroController.js

### 🛣️ Paso 6: Rutas
* routes/autorRoutes.js
* routes/libroRoutes.js

### 🌐 Paso 7: Archivo principal 
app.js

### 🔼 Paso 8: Archivo 
server.js

### 🧪 Paso 9: Ejecutar el servidor
```
node server.js
```

### 📝 Paso 10: Consultas SQL iniciales (opcional)
```sql
CREATE DATABASE db_autores_libros;

\c db_autores_libros;

CREATE TABLE autor (
  id_autor SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  apellidos VARCHAR(100),
  fecha_nacimiento DATE,
  nacionalidad VARCHAR(100),
  biografía TEXT
);

CREATE TABLE libro (
  id_libro SERIAL PRIMARY KEY,
  id_autor INTEGER REFERENCES autor(id_autor),
  título VARCHAR(200),
  género VARCHAR(100),
  fecha_publicación DATE,
  editorial VARCHAR(100),
  isbn VARCHAR(13),
  número_páginas INTEGER
);
```

## 🧪 Pruebas sugeridas
* GET /api/autores
* GET /api/autores/1
* POST /api/autores → body JSON
* PUT /api/autores/1 → body JSON
* DELETE /api/autores/1

Y lo mismo con /api/libros.

## Configurar 
Configurar el archivo package.json para ejecutar el servidor en modo desarrollo usando el comando:
```
npm run dev
```

## Instalar nodemon
 Asegúrate de tener instalado nodemon como dependencia de desarrollo: 
 ```
 npm install --save-dev nodemon
 ```
## 🛠️ Paso: Configurar package.json
Reemplaza o actualiza tu package.json con lo siguiente (o simplemente agrega el script):
```json
{
  "name": "api-autores-libros",
  "version": "1.0.0",
  "description": "API REST para gestión de autores y libros con Express y PostgreSQL",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0",
    "pg": "^8.7.3",
    "sequelize": "^6.9.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

### ✅ Ahora puedes usar los siguientes comandos:
Producción
```
npm start
```
Desarrollo (con reinicio automático)
```
npm run dev
```