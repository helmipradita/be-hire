// const { Pool } = require('pg');
// const fs = require('fs');
// require(`dotenv`).config();

// const pool = new Pool({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DB,
//   password: process.env.PG_PASS,
//   port: process.env.PG_PORT,
// });

// pool.connect((err) => {
//   if (err) {
//     console.log('<:: PostgreSQL Client Error', err);
//   } else {
//     console.log(`::> PostgreSQL Client Connected`);
//   }
// });

// module.exports = pool;

const { Pool } = require(`pg`);
require(`dotenv`).config();

const connectionString = process.env.PG_CONNECT;

const pool = new Pool({ connectionString });

pool.connect((err) => {
  if (err) {
    console.log('<:: PostgreSQL Client Error', err);
  } else {
    console.log(`::> PostgreSQL Client Connected`);
  }
});

module.exports = pool;
