import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Employee } from '../models/empleado.model.js';
import {Tercero} from '../models/tercero.model.js';
import {Cargo} from '../models/cargo.model.js';
import { Where } from 'sequelize/lib/utils';

const barberos = async (req, res) => {
    try {
        const barberos = await Employee.findAll({ 
            where: { id_cargo: 1 },
            // attributes: ['id_empleado', 'id_cargo'], // Selecciona los atributos que quieras de Employee
            include: {
                model: Tercero // Selecciona solo el atributo 'name' de Tercero
            }
        });
        // res.status(200).json(barberos.tercero.name);
        let name = barberos.map(barberos => ({name : barberos.tercero.name})); 
        console.log(name)
        res.render('../views/citas.hbs', { barberos: name });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        })
    }
}

export const employeeController = {
    barberos,
}