import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usuario } from "../models/usuario.model.js";
import { Tercero } from "../models/tercero.model.js";
import { Email } from "../models/email.model.js";

const obtenerDatos = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        console.log(usuarios);


        let arreglousuarios = usuarios.map(terceros => ({
            id: terceros.id_tercero,
            nombre: terceros.nombre,
            apellido: terceros.apellido,
            telefono: terceros.telefono,
            fecha_nacimiento: terceros.fecha_nacimiento,
        }));
        res.render('../views/mantenimientos/mant-usuario.hbs', {usuarios: arreglousuarios});

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        })
    }
}

const usuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        console.log(usuarios);
        res.render('../views/registrarusuario.hbs');
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        })
    }
}

const register = async (req, res) => { 
    
    try{          // Aqui se hacen todas las validaciones
        const { nombre, apellido, telefono, fecha_nacimiento, email, id_direccion, username, password } = req.body;
        
        // 1. Validar que tercero no exite
        // const terceroExistente = await Tercero.findOne({ where: { telefono: telefono } });
        // if (terceroExistente) {
        //     return res.status(409).json({ok: true, message: 'La persona o empresa ya existe'})
        // }
        
        await Email.create({
            email,
            id_estado: 9,
        });
    
        const id_email = await Email.findOne({ where: { email: email } });

          // Insertar en la tabla terceros
          const tercero = await Tercero.create({
            nombre,
            apellido,
            telefono,
            fecha_nacimiento,
            id_email: id_email.id_email,
            id_direccion
          });
      
          // Insertar en la tabla usuarios
          if(!username || !password || !tercero){
            return res.status(400).json({ok: false, message: 'Username or password missed'});
        }

        //Encontrar el usuario para saber si existe e indicar que ya es existente
        const user = await Usuario.findOne(({ where: { username: username } }))

        if (user) {
            return res.status(409).json({ok: true, message:'User already exists'});
        }
        // En caso de que no exista se hace lo siguiente
        // Crear un usuario

        // 1. Se hashea la contraseña
        const salt = await bcrypt.genSalt(10); // Creamos saltos para que los hash no sean iguales, ej: si la pass es la misma en algunos casos
        const hashedPassword = await bcrypt.hash(password, salt);

        // 2. Se crea el usuario con la contrase;a hasheada
        const newUser = await Usuario.create({ username: username, 
                                               password: hashedPassword, 
                                               id_tercero: tercero.id_tercero,
                                               fecha_registro: Date.now() 
                                            });

        // 3. Luego se crea el token que es de orden publico
        // Por eso la clave secreta se hace en .env

        // Firmar el token, y le pasamos el payload que es 
        const token = jwt.sign({
            username: newUser.username,
        },
            process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
        )
        
        // res.render('../views/login.hbs');
        // return res.status(201).json({ok: true, message: token});

        } catch (error) {
          console.error('Error al registrar usuario:', error);
          res.status(500).send('Error al registrar usuario');
        };
      }

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body);
        if(!username || !password){
            return res
                    .status(400)
                    .json({ok: false, message: 'Username or password missed'});
        }

        const user = await Usuario.findOne(({ where: { username: username } }))
        if (!user) {
            return res
                    .status(409)
                    .json({ok: true, message:'User not found'});
        }

        // Tenemos que comparar si la contraseña que se esta ingresando es la misma que la que esta en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);

        // Si no coincide pues se envia un mensaje de error
        if (!isMatch) {
            return res.status(401).json({ok: false, message: 'Invalid credentials'});
        }

        // Si el usuario es correcto y la contrasena pues creamos el token
        const token = jwt.sign({
                username: user.username,
            },
                process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )
        res.redirect('/index');
        // res.render('../views/index.hbs');
        // return res.json({ok: true, message: token}); // Devolvemos el token y se usa en el frontend para usarlo segun la ruta.
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        })
    }
}

// Esto seria una ruta protegida ya que solo se ve la informacion si se pasa por la verificacion
const profile = async(req, res) => {
    try {

        const user = await User.findOne(({ where: { username: req.username } }))
        
        return res.json({ok: true, message: user});

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        })
    }
}
export const usuarioController = {
    obtenerDatos,
    usuarios,
    register,
    login,
    profile
}

// Funcion que se ejecute antes de una funcion, los middlewares
