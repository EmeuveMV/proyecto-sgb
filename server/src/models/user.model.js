import { connection } from '../../database/connection.js';

const create = async (username, password) => {
  const query = {
    // La interpolacion esta prohibida ${} debido a inyeccin sql 
    text: `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING username, password
    `,
    values: [username, password]
  }
  const {rows} = await connection.query(query)
  return rows[0] // Solo el select nos devuelve filas, por lo tanto, ni insert etc
}

const findOneByUsername = async(username) => {
  const query ={
    text:`
      SELECT * FROM users
      WHERE username = $1
    `,
    values: [username]
  }
  const {rows} = await connection.query(query)
  return rows[0]
}

export const userModel = {
  create,
  findOneByUsername,
}