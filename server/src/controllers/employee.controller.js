import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Employee } from '../models/empleado.model.js';
import {Tercero} from '../models/tercero.model.js';
import {Cargo} from '../models/cargo.model.js';

const barberos = async (req, res) => {
    try {
        const barberos = await Employee.findAll({where: { id_cargo: 1 },
            include: {
                model: Tercero,
                attributes: ['name','lastname'] // Selecciona los atributos que quieres de Tercero
        }});
        return res.json(barberos);
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