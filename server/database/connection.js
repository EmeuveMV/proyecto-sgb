import 'dotenv/config';
// import pg from 'pg';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    define: {
        timestamps: false
    }
});


// const { Pool } = pg;

// export const connection = new Pool({ 
//     port: process.env.PGPORT,
//     database: process.env.PGDATABASE,
//     host: process.env.PGHOST,
//     password: process.env.PGPASS,
//     user: process.env.PGUSER,
//     allowExitOnIdle: true // Siempre que sea posible cierra la conexion
// })

// console.log(connection)

// try{
//     await connection.query('SELECT NOW()')
//     console.log('Database connected')
// }catch (error)
// {
//     console.error(error)
// }



// const getUsers = async () => {
//     try {
//        const result = await connection.query('SELECT id, "username", password FROM public.users;');
//        console.log(result.rows);
//     } catch (error) {
//         console.error(error);
//     }
// }

// getUsers();