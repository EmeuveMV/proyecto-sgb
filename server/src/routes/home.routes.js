import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = Router();

// Ejemplo de ruta para crear un nuevo usuario

//Register
router.post('/register', userController.register);

router.get('/', (req, res) => { res.json({ message: 'Conexion hecha desde el Home Page en archivo de rutas' }) })

// TODO hacer lo relacionado con el manejo de errores try catch y routehelper

/* Login */

router.post('/login', userController.login);
router.get('/profile', verifyToken, userController.profile); // Ruta protegida.


router.get('/services', (req, res) => { res.send('Conexion hecha desde la pagina de servicios') })

router.get('/user', (req, res) => { res.json({ message: 'Conexion hecha desde la pagina de usuarios' }) })

router.post('/user', (req, res) => { res.json({ message: 'Se guardaria el usuario o se guardarian cambios' }) })

router.get('/about', (req, res) => { res.json({ message: 'Conexion hecha desde el Home Page' }) })

export default router;
