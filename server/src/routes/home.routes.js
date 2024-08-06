import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';
import { User } from '../models/user.model.js';
import { terceroController } from '../controllers/tercero.controller.js';
import {employeeController} from '../controllers/employee.controller.js'
import {citaController} from '../controllers/cita.controller.js'


const router = Router(); 

//Users
// router.use('/users', userController.users);

// Ejemplo de ruta para crear un nuevo usuario

//Register
router.post('/register', userController.register);

router.get('/', (req, res) => { res.json({ message: 'Conexion hecha desde el Home Page en archivo de rutas' }) })

// Index
// router.get('/index', (req, res) => {
//     res.render('../views/index')
// });

/* Login */
router.get('/login', (req, res) => {
    res.render('../views/login')
});

router.post('/login', userController.login);

// Citas
router.get('/citas', citaController.barberos);
router.post('/citas', citaController.register);

//Facturacion
router.get('/facturacion', (req, res) => {
    res.render('../views/facturacion');
});


// router.get('/citas', (req, res) => {
//     res.render('../views/citas')
// })

router.get('/users', async (req, res) => {
    const users = await User.findOne({ where: { username: 'vlad' }})
    console.log(users.dataValues.username);
    res.render('../views/user', { name: users.dataValues.username })
})

router.get('/index', verifyToken, (req, res) => {
    res.render('../views/index')
}); // Ruta protegida.


router.get('/services', (req, res) => { res.send('Conexion hecha desde la pagina de servicios') })

router.get('/about', (req, res) => { res.json({ message: 'Conexion hecha desde el Home Page' }) })

// Mantenimientos

// Terceros
router.get('/mant-tercero', terceroController.obtenerDatosTerceros);
// router.post('/mant-tercero', terceroController.modificarTercero);

export default router;
