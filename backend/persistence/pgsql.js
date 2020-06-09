const waitPort = require('wait-port');
// const pgsql = require('pg');

console.log('=== env ===');
console.log(process.env);

const Pool = require('pg').Pool;
let pool;

const {
  DB_HOST: HOST,
  DB_USER: USER,
  DB_PASSWORD: PASSWORD,
  DB_NAME: DB,
} = process.env;

async function init() {

  await waitPort({ HOST, port: 5432, timeout: 15000 });

  const pool = new Pool({
    host: HOST,
    port: 5432,
    user: USER,
    password: PASSWORD,
    database: DB
  });

  return new Promise((acc, rej) => {
    pool.query(
      'CREATE TABLE IF NOT EXISTS todo_items (id SERIAL PRIMARY KEY, item TEXT, completed boolean DEFAULT FALSE)',
      err => {
        if (err) return rej(err);
        console.log(`Connected to postgres db at host ${HOST}`);
        acc();
      },
    );
  });
}

async function teardown() {
  return new Promise((acc, rej) => {
      pool.end(err => {
          if (err) rej(err);
          else acc();
      });
  });
}

module.exports = {
  init,
  teardown
}