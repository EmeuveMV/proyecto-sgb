import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';
import { User } from '../models/user.model.js';
import { terceroController } from '../controllers/tercero.controller.js';
import {employeeController} from '../controllers/employee.controller.js';
import {citaController} from '../controllers/cita.controller.js';
import { usuarioController } from '../controllers/usuario.controller.js';
import { clienteController } from '../controllers/cliente.controller.js';
import { facturacionController } from '../controllers/facturacion.controller.js';


const router = Router(); 

router.get('/', (req, res) => { res.json({ message: 'Conexion hecha desde el Home Page en archivo de rutas' }) })

//Users
// router.use('/users', userController.users);

// Ejemplo de ruta para crear un nuevo usuario


// Index
// router.get('/index', (req, res) => {
    //     res.render('../views/index')
    // });

router.get('/index', (req, res) => {
    res.render('../views/index')
}); // Ruta protegida.
 
// Login
router.get('/login', (req, res) => {
    res.render('../views/login');
});
router.post('/login', usuarioController.login);



// Usuario
router.get('/users', async (req, res) => {
    const users = await User.findOne({ where: { username: 'vlad' }})
    console.log(users.dataValues.username);
    res.render('../views/user', { name: users.dataValues.username })
})


//Usuario

router.get('/registrarusuario', usuarioController.usuarios);
router.post('/registrarusuario', usuarioController.register);


// Citas
router.get('/citas', citaController.barberos);
router.post('/citas', citaController.register);

//Facturacion
router.get('/facturacion', facturacionController.obtenerDatos);
router.post('/facturacion', facturacionController.registrar);

// Mantenimientos

// Terceros
router.get('/mant-tercero', terceroController.obtenerDatosTerceros);
router.post('/mant-tercero', terceroController.registrarTercero);
router.put('/mant-tercero', terceroController.modificarTercero);

//Cliente
router.get('/mant-cliente', clienteController.obtenerDatos);
router.post('/mant-cliente', clienteController.registrar);
router.put('/mant-cliente', clienteController.modificar);

//Usuarios
router.get('/mant-usuario', usuarioController.obtenerDatos);
router.post('/mant-usuario', usuarioController.register);

//Empleado
router.get('/mant-empleado', terceroController.obtenerDatosTerceros);

export default router;
