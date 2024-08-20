import { Cliente } from '../models/cliente.model.js';
import { Employee } from '../models/empleado.model.js';
import { Servicio } from '../models/servicio.model.js';
import { Tercero } from '../models/tercero.model.js';
import { Cita } from '../models/cita.model.js';
import { Provincia } from '../models/direccion/provincia.model.js';
import { Municipio } from '../models/direccion/municipio.model.js';
import { TipoServicio } from '../models/tiposervicio.model.js';
import { Op } from 'sequelize';
import { Calle } from '../models/direccion/calle.model.js';
import { Sector } from '../models/direccion/sector.model.js';
import { Direccion } from '../models/direccion/direccion.model.js';
import { DetalleCita } from '../models/detallecita.model.js';

const barberos = async (req, res) => {

    try {

        const { datatime } = req.query



        const barberos = await Employee.findAll({
            where: { id_cargo: 1 },
            // attributes: ['id_empleado', 'id_cargo'], // Selecciona los atributos que quieras de Employee
            include: {
                model: Tercero

            }
        });

        const servicios = await Servicio.findAll({
            where: { id_tipo_servicio: 1 },
            include: {
                model: TipoServicio
            }
        });

        const provincias = await Provincia.findAll();

        const municipios = await Municipio.findAll({
            // include: {
            //     model: Provincia,
            //     where: {
            //         id_provincia: provincias.id_provincia
            //     }
            // }
        });

        if (!servicios)
            return res.status(404).json({ error: 'No se encontraron servicios' });

        let arregloservicios = servicios.map(servicios => ({ id: servicios.id_servicio, servicios: servicios.servicio, precio: servicios.precio }));
        // console.log(arregloservicios);

        let arregloprovincias = provincias.map(provincias => ({ id: provincias.id_provincia, provincia: provincias.provincia }));
        let arreglomunicipios = municipios.map(municipios => ({ id: municipios.id_municipio, municipio: municipios.municipio, id_provincia: municipios.id_provincia }));

        // res.status(200).json(barberos.tercero.name);
        let arreglobarberos = barberos.map(barberos => ({ id: barberos.id_empleado, nombre: barberos.tercero.nombre }));
        // console.log(arreglobarberos);

        res.format({
            html: function () {
                res.render('../views/citas.hbs', { barberos: arreglobarberos, servicios: arregloservicios, provincias: arregloprovincias, municipios: arreglomunicipios }); // 
            },
            json: function () {
                res.status(200).json(arreglobarberos);
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        })
    }
}

// Controlador para reservar una cita
const register = async (req, res) => {
    try {

        const {
            nombre_cliente,
            id_empleado,
            calle,
            sector,
            municipio,
            provincia,
            id_servicio,
            fecha_cita,
            id_estado,
            comentario,
            detalles
        } = req.body;

        console.log("Variables que se envian: ", nombre_cliente, id_empleado, calle, sector, municipio, provincia, id_servicio, fecha_cita, comentario);
        // Verificar que todos los datos requeridos estén presentes
        if (!id_empleado || !fecha_cita) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }

        if (!nombre_cliente) {
            return res.status(400).json({ error: 'No se pueden crear citas sin nombre' });
        }

        //Verificar que la fecha no sea menor que la actual
        if (fecha_cita < Date.now()) {
            return res.status(404).json({ error: 'La fecha no puede ser menor que la actual' });
        }


        if (!Array.isArray(detalles) || detalles.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Detalles de la factura no proporcionados o están vacíos'
            });
        }

        // Crear la direccion
if(sector){

       const nuevoSector = await Sector.create({
                sector_barrio: sector,
                id_municipio: municipio
            });

            const nuevaCalle = await Calle.create({
                nombre_calle: calle,
                id_sector: nuevoSector.id_sector
            });
            const nuevaDireccion = await Direccion.create({
                id_calle: nuevaCalle.id_calle
            });
   


        // Crear la cita
        const nuevaCita = await Cita.create({
            id_empleado,
            id_servicio,
            fecha_cita,
            id_estado,
            comentario,
            nombre_cliente,
           id_direccion: null || nuevaDireccion.id_direccion
        });
        for (const detalle of detalles) {
            await DetalleCita.create({
                id_cita: nuevaCita.id_cita, // Usar el ID de la cita recién creada
                id_servicio: detalle.id_servicio,
            });
        }


        // Devolver la cita creada
        if (nuevaCita) {
            res.format({
                text: function () {
                    res.send('Cita creada correctamente');
                },
                // json: function () {
                //     res.status(200).json(arreglobarberos);
                // }
            })

        }
} else{

        // Crear la cita
        const nuevaCita = await Cita.create({
            id_empleado,
            id_servicio,
            fecha_cita,
            id_estado,
            comentario,
            nombre_cliente,
           
        });
        for (const detalle of detalles) {
            await DetalleCita.create({
                id_cita: nuevaCita.id_cita, // Usar el ID de la cita recién creada
                id_servicio: detalle.id_servicio,
            });
        }


        // Devolver la cita creada
        if (nuevaCita) {
            res.format({
                text: function () {
                    res.send('Cita creada correctamente');
                },
                // json: function () {
                //     res.status(200).json(arreglobarberos);
                // }
            })

        }


}
         




    } catch (error) {
        console.error('Error al reservar cita:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};



const barberoJson = async (req, res) => {
    try {
        const barberos = await Employee.findAll({
            where: { id_cargo: 1, id_estado: 1 },
            // attributes: ['id_empleado', 'id_cargo'], // Selecciona los atributos que quieras de Employee
            include: {
                model: Tercero
            }
        });


        let arreglobarberos = barberos.map(barberos => ({ id: barberos.id_empleado, nombre: barberos.tercero.nombre }));
        res.status(200).json(arreglobarberos);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        })
    }
}

export const citaController = {
    barberos,
    register,
    barberoJson

}
