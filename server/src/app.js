import 'dotenv/config'
import express from 'express';
import consolidate from 'consolidate';
import routes from './routes/home.routes.js';

const app = express()
const PORT = process.env.PORT || 3001

// Plantilla
app.use(express.json()); // Middleware para parsear el body de las peticiones
// Con esto podemos enviar a traves del cuerpo del mensaje solicitudes json

// app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.engine('hbs', consolidate.handlebars); // consolidate se encarga de hacer los ajustes
app.set('views engine', 'hbs'); // Se especifica que se usara handlebars

//Ejemplo de uso de plantilla
app.get('/user', (req, res) => {
    res.render('user.hbs', { name: 'John' });
});


// Route
app.use("/",routes)


app.listen(3000, () => { console.log('Server listening on port ' + PORT) })

/*
    Se puede hacer un routehelper en otro archivo para tratar los errores.
*/

/*
    Los metodos reciben como parametro la ruta y una funcion, esa funcion puede tener dentro otra funcion
    o ser un arreglo de funciones.
*/
