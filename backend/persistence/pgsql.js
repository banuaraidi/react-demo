// const waitPort = require('wait-port');

const Pool = require('pg').Pool;
let pool;

const {
  DB_HOST: HOST,
  DB_USER: USER,
  DB_PASSWORD: PASSWORD,
  DB_NAME: DB,
} = process.env;

async function init() {

  // await waitPort({ HOST, port: 5432, timeout: 15000 });

  pool = new Pool({
    host: HOST,
    port: 5432,
    user: USER,
    password: PASSWORD,
    database: DB
  });

  return new Promise((acc, rej) => {
    pool.query(
      'CREATE TABLE IF NOT EXISTS todo_items (id SERIAL PRIMARY KEY, name TEXT, completed smallint DEFAULT 0)',
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

async function getItems() {
  return new Promise((acc, rej) => {
    pool.query('SELECT * FROM todo_items ORDER BY id', (err, result) => {
      if (err) return rej(err);
      acc(
        result.rows.map(item =>
          Object.assign({}, item, {
            completed: item.completed === 1,
          }),
        ),
      );
    });
  });
}

async function storeItem(data) {
  const text = 'INSERT INTO todo_items (name, completed) VALUES ($1, $2) RETURNING *';
  const values = [data.name, data.completed ? 1 : 0];

  try{
    return await pool.query(text, values);
  }catch(err){
    console.log(err.stack);
  }
}

async function updateItem(id, data) {
  const text = 'UPDATE todo_items SET completed=$1 WHERE id=$2 RETURNING *';
  const values = [data.completed, id];
  try{
    return await pool.query(text, values);
  }catch(err){
    console.log(err.stack);
  }
}

async function removeItem(id) {
  const text = 'DELETE FROM todo_items WHERE id = $1';
  const values = [id];
  try{
    return await pool.query(text, values);
  }catch(err){
    console.log(err.stack);
  }
}

module.exports = {
  init,
  teardown,
  getItems,
  storeItem,
  updateItem,
  removeItem
}