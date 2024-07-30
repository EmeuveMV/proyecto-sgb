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
router.get('/index', (req, res) => {
    res.render('../views/index')
});

/* Login */
router.get('/login', (req, res) => {
    res.render('../views/login')
});

router.post('/login', userController.login);

// Citas
router.get('/citas', citaController.barberos);
router.post('/citas', citaController.register);



// router.get('/citas', (req, res) => {
//     res.render('../views/citas')
// })

router.get('/users', async (req, res) => {
    const users = await User.findOne({ where: { username: 'vlad' }})
    console.log(users.dataValues.username);
    res.render('../views/user', { name: users.dataValues.username })
})

router.get('/profile', verifyToken, userController.profile); // Ruta protegida.


router.get('/services', (req, res) => { res.send('Conexion hecha desde la pagina de servicios') })

router.get('/user', (req, res) => { res.json({ message: 'Conexion hecha desde la pagina de usuarios' }) })

router.post('/user', (req, res) => { res.json({ message: 'Se guardaria el usuario o se guardarian cambios' }) })

router.get('/about', (req, res) => { res.json({ message: 'Conexion hecha desde el Home Page' }) })

// Mantenimientos
router.get('/mant-tercero', terceroController.obtenerDatosTerceros);

router.get('/mant-tercero:id');

export default router;
