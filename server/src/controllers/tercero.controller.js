import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Tercero } from "../models/tercero.model.js";

const obtenerDatosTerceros = async (req, res) => {
    try {
        const terceros = await Tercero.findAll();
        if (!terceros) {
            res.status(404).json('No se encontraron datos');
            return;
          }
          console.log(terceros);

          let arregloterceros = terceros.map(terceros => ({
            id: terceros.id,
            name: terceros.name,
            lastname: terceros.lastname,
            phone: terceros.phone,
            email: terceros.email,
            birth: terceros.birth
        }));

        return res.render('../views/mantenimientos/mant-tercero', {terceros: arregloterceros}) 
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        })
    }
}

// Modificar tercero
const modificarTercero = async (req, res) => {
    
}

export const terceroController = {
    obtenerDatosTerceros,
}