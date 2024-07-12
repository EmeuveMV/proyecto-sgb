import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userModel } from "../models/user.model.js";

const register = async (req, res) => {
    try {
        const {username, password} = req.body;

        // Aqui se hacen todas las validaciones

        // 1. Validar que el usuario no exite
        if(!username || !password){
            return res.status(400).json({ok: false, message: 'Username or password missed'});
        }

        //Encontrar el usuario para saber si existe e indicar que ya es existente
        const user = await userModel.findOneByUsername(username);
        if (user) {
            return res.status(409).json({ok: true, message:'User already exists'});
        }
        // En caso de que no exista se hace lo siguiente
        // Crear un usuario

        // 1. Se hashea la contraseña
        const salt = await bcrypt.genSalt(10); // Creamos saltos para que los hash no sean iguales, ej: si la pass es la misma en algunos casos
        const hashedPassword = await bcrypt.hash(password, salt);

        // 2. Se crea el usuario con la contrase;a hasheada
        const newUser = await userModel.create(username, hashedPassword);

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

        return res.status(201).json({ok: true, message: token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        })
    }
}

const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        if(!username || !password){
            return res
                    .status(400)
                    .json({ok: false, message: 'Username or password missed'});
        }

        const user = await userModel.findOneByUsername(username);
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

        return res.json({ok: true, message: token}); // Devolvemos el token y se usa en el frontend para usarlo segun la ruta.
        
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

        const user = await userModel.findOneByUsername(req.username);
        
        return res.json({ok: true, message: user});

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        })
    }
}
export const userController = {
    register,
    login,
    profile,
}

// Funcion que se ejecute antes de una funcion, los middlewares
