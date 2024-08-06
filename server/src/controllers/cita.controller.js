import { Cliente } from '../models/cliente.model.js';
import { Employee } from '../models/empleado.model.js';
import { Servicio } from '../models/servicio.model.js';
import { Tercero } from '../models/tercero.model.js';
import { Cita } from '../models/cita.model.js';
import { TipoServicio } from '../models/tiposervicio.model.js';

const barberos = async (req, res) => {
    try {
        const barberos = await Employee.findAll({
            where: { id_cargo: 1 },
            // attributes: ['id_empleado', 'id_cargo'], // Selecciona los atributos que quieras de Employee
            include: {
                model: Tercero
            }
        });

        const servicios = await Servicio.findAll({
            include: {
                model: TipoServicio
            }
        });
        if (!servicios)
            return res.status(404).json({ error: 'No se encontraron servicios' });

        let arregloservicios = servicios.map(servicios => ({ id: servicios.id_servicio, servicios: servicios.servicio }));
        console.log(arregloservicios);

        // res.status(200).json(barberos.tercero.name);
        let arreglobarberos = barberos.map(barberos => ({ id: barberos.tercero.id, name: barberos.tercero.name }));
        console.log(arreglobarberos);

        res.render('../views/citas.hbs', { barberos: arreglobarberos, servicios: arregloservicios }); // 
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
        const { id_cliente, id_empleado, id_servicio, fecha_cita, estado, comentario } = req.body;

        console.log(id_cliente, id_empleado, id_servicio, fecha_cita, estado, comentario);
        // Verificar que todos los datos requeridos estén presentes
        if (!id_cliente || !id_empleado || !id_servicio || !fecha_cita || !estado) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }

        // Verificar que el cliente exista
        const cliente = await Cliente.findByPk(id_cliente);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Verificar que el empleado exista
        const empleado = await Employee.findByPk(id_empleado);
        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }

        // Verificar que el servicio exista
        const servicio = await Servicio.findByPk(id_servicio);
        if (!servicio) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        //Verificar que la fecha no sea menor que la actual
        if (fecha_cita < Date.now()) {
            return res.status(404).json({ error: 'La fecha no puede ser menor que la actual'});
        }

        // Crear la cita
        const nuevaCita = await Cita.create({
            id_cliente,
            id_empleado,
            id_servicio,
            fecha_cita,
            estado,
            comentario
        });

        // Devolver la cita creada
        res.status(201).json(nuevaCita);
    } catch (error) {
        console.error('Error al reservar cita:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const citaController = {
    barberos,
    register,

}
