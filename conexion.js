
const { Pool } = require('pg'); //pg es una librería de Node.js que sirve para conectarse
//el pool son conjunto de conexiones abiertas a la bd que el servidor recicla

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '000',
  database: 'actividad1',
  port: 5432
});

module.exports = pool;

