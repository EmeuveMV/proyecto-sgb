import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';
import { Factura } from './factura.model.js'
import { Servicio } from './servicio.model.js';

export const DetalleFactura = sequelize.define('detallesfacturas', {
    id_detalle_factura: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_factura: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Factura,
            key: 'id_factura'
        }
    },
    id_servicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Servicio,
            key: 'id_servicio'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

// Definir la asociación
DetalleFactura.belongsTo(Factura, { foreignKey: 'id_factura' },
                        Servicio, { foreignKey: 'id_servicio' }
                        );
Factura.hasMany(DetalleFactura, { foreignKey: 'id_factura' });
Servicio.hasMany(DetalleFactura, { foreignKey: 'id_servicio' });

