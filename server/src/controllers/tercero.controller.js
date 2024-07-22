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
        return res.render('../views/mant-tercero',{terceros:{
            name: terceros.dataValues.name,
           lastname: terceros.dataValues.lastname,
           phone: terceros.dataValues.phone,
             email: terceros.dataValues.email,
           birth: terceros.dataValues.birth,
        }})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        })
    }
}

//Para cuando se requiera por nombre o id
// const obtenerDatosTerceros = async (req, res) => {
//     try {
//         const terceros = await Tercero.findOne({where: {name: 'Vladimir'}});
//         if (!terceros) {
//             res.status(404).json('No se encontraron datos');
//             return;
//           }
//         console.log(terceros);
//         return res.render('../views/mant-tercero', {
//             name: terceros.dataValues.name,
//             lastname: terceros.dataValues.lastname,
//             phone: terceros.dataValues.phone,
//             email: terceros.dataValues.email,
//             birth: terceros.dataValues.birth,
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             ok: false,
//             msg: 'Error interno del servidor'
//         })
//     }
// }

export const terceroController = {
    obtenerDatosTerceros,
}