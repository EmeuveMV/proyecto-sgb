import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';

export const User = sequelize.define('users',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  });



















// const create = async (username, password) => {
//   const query = {
//     // La interpolacion esta prohibida ${} debido a inyeccin sql 
//     text: `
//       INSERT INTO users (username, password)
//       VALUES ($1, $2)
//       RETURNING username, password
//     `,
//     values: [username, password]
//   }
//   const {rows} = await connection.query(query)
//   return rows[0] // Solo el select nos devuelve filas, por lo tanto, ni insert etc
// }

// const findOneByUsername = async(username) => {
//   const query ={
//     text:`
//       SELECT * FROM users
//       WHERE username = $1
//     `,
//     values: [username]
//   }
//   const {rows} = await connection.query(query)
//   return rows[0]
// }

// const updateUser = async(username, newUsername) =>{
//   const query = {
//     text: `
//       UPDATE users
//       SET username = $1
//       WHERE id = $2
//       RETURNING *
//     `,
//     values: ['newUsername']
//   }
// }

// export const userModel = {
//   create,
//   findOneByUsername,
//   updateUser
// }