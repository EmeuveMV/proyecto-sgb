import { DetalleFactura } from "../models/detallefactura.model.js";
import { Servicio } from "../models/servicio.model.js";
import { TipoServicio } from "../models/tiposervicio.model.js";
import { Employee } from "../models/empleado.model.js";
import { Tercero } from "../models/tercero.model.js";
import { Factura } from "../models/factura.model.js";


const obtenerDatos = async (req, res) => {
    try {
        const empleados = await Employee.findAll({
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
        let arregloempleados = empleados.map(empleados => ({ id: empleados.id_empleado, nombre: empleados.tercero.nombre }));
        let arregloservicios = servicios.map(servicios => ({ id: servicios.id_servicio, servicios: servicios.servicio, precio: servicios.precio }));
        console.log(arregloservicios);
        res.render('../views/facturacion.hbs', { servicios: arregloservicios, empleados: arregloempleados });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        })
    }
}
const registrar = async (req, res) => {
    const {
        id_empleado,
        nombre_cliente,
        id_metodo_pago,
        total,
        detalles // para el  JSON
    } = req.body;

    try {
        // Verifica si detalles es un arreglo y no está vacío
        if (!Array.isArray(detalles) || detalles.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Detalles de la factura no proporcionados o están vacíos'
            });
        }

        // Crear la factura
        const factura = await Factura.create({
            fecha_factura: Date.now(),
            total,
            id_metodo_pago,
            nombre_cliente,
            id_empleado
        });

        // Recorrer los detalles y crear cada detalle de factura
        for (const detalle of detalles) {
            await DetalleFactura.create({
                id_factura: factura.id_factura,
                id_servicio: detalle.id_servicio,
                cantidad: detalle.cantidad,
                precio_unitario: detalle.precio_unitario,
                subtotal: detalle.subtotal
            });
        }

        return res.status(200).json({
            ok: true,
            msg: 'Factura registrada con éxito'
           
        });
    } catch (error) {
        console.error("Error al registrar factura:", error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        });
    }
}

export const facturacionController = {
    obtenerDatos,
    registrar
}
