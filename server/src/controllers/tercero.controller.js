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
        //   console.log(terceros);

          let arregloterceros = terceros.map(terceros => ({
            id: terceros.id_tercero,
            nombre: terceros.nombre,
            apellido: terceros.apellido,
            telefono: terceros.telefono,
            fecha_nacimiento: terceros.fecha_nacimiento,
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

const registrarTercero = async (req, res) => {
    console.log("LLEGUE AQUIXXXXXX")
    try {
    const { nombre, apellido, telefono, fecha_nacimiento } = req.body;
    // console.log(nombre, apellido, telefono, fecha_nacimiento);

        const tercero = await Tercero.create({
            nombre,
            apellido,
            telefono,
            fecha_nacimiento
        });

        // console.log(tercero);
        return res.status(200).json({ok: true, message: 'Persona o empresa registrado correctamente'});
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
    const { id, nombre, apellido, telefono, fecha_nacimiento } = req.body;
    console.log("LLEGUE AQUI0")
    try {
        // const tercero = await Tercero.findByPk(id);
        // console.log("Lo que encontre: ", tercero);
        
        // if (!tercero) {
        //     return res.status(404).json({ok: false, message: 'Tercero no encontrado'});
        // }
        await Tercero.update({  nombre: nombre, 
                                apellido: apellido, 
                                telefono: telefono, 
                                fecha_nacimiento: fecha_nacimiento }, {
                                where: { id_tercero: id }
        });
        
        return res.status(200).json({ok: true, message: 'Tercero modificado correctamente'});    
        
        //les explico ahora

        // return res.status(200).json({ok: true, message: 'Tercero modificado correctamente'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        })
    }
}

export const terceroController = {
    obtenerDatosTerceros,
    registrarTercero,
    modificarTercero,
}