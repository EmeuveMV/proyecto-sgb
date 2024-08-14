import 'dotenv/config'
import express from 'express';
import consolidate from 'consolidate';
import routes from './routes/home.routes.js';
import { sequelize } from '../database/connection.js';
import { engine } from 'express-handlebars';

const app = express()
const PORT = process.env.PORT || 3001


try {
    await sequelize.authenticate();
    // await sequelize.sync({ alter: true });
    console.log('Db Connected');
} catch (error) {
    console.log(error);
}

// Plantilla
// Middleware
app.use(express.json()); // Middleware para parsear el body de las peticiones
app.use(express.urlencoded({ extended: true }))
// Con esto podemos enviar a traves del cuerpo del mensaje solicitudes json

// app.use(express.urlencoded({ extended: true }));

// Motor de vistas
app.engine('.hbs', engine({
    extname: 'hbs',
    defaultLayout: false,
    layoutsDir: 'views'
})); // consolidate se encarga de hacer los ajustes
app.set('views', './views');
app.set('view engine', 'hbs'); // Se especifica que se usara handlebars
app.use(express.static("public"));


// Routes
app.use('/', routes);

// app.post('/login', (req, res) => {
//     console.log(req.body);
//     const {username, password} = req.body;
//     console.log(`Username: ${username} and Password: ${password}`);
//     return;
// });

app.listen(3000, () => { console.log('Server listening on port ' + PORT) })

/*
    Se puede hacer un routehelper en otro archivo para tratar los errores.
*/

/*
    Los metodos reciben como parametro la ruta y una funcion, esa funcion puede tener dentro otra funcion
    o ser un arreglo de funciones.
*/
