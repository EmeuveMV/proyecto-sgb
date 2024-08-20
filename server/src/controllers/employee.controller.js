import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Employee } from '../models/empleado.model.js';
import {Tercero} from '../models/tercero.model.js';
import {Cargo} from '../models/cargo.model.js';
import { Where } from 'sequelize/lib/utils';

const empleados = async (req, res) => {
    try {
        const empleados = await Employee.findAll({ 
            // attributes: ['id_empleado', 'id_cargo'], // Selecciona los atributos que quieras de Employee
            include: {
                model: Tercero // Selecciona solo el atributo 'name' de Tercero
            }
        });
        // res.status(200).json(barberos.tercero.name);
        let arregloempleados = empleados.map(empleados => ({
            id: empleados.id_tercero,
            nombre: terceros.nombre,
            apellido: terceros.apellido,
            telefono: terceros.telefono,
            fecha_nacimiento: terceros.fecha_nacimiento,
        }));

        return res.render('../views/mantenimientos/mant-tercero', {terceros: arregloterceros}) 

        res.render('../views/mant-empleado', { barberos: name });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        })
    }
}

export const employeeController = {
    empleados,
}