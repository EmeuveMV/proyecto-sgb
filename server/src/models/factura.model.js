import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';
import { Cliente } from './cliente.model.js';
import { Employee } from './empleado.model.js';
import { MetodoPago } from './metodopago.model.js';
import { Estado } from './estado.model.js';

export const Factura = sequelize.define('facturas', {
    id_factura: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: 
            {
                model: Cliente,
                key: 'id_cliente'
            }
    },
    fecha_factura: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    id_metodo_pago: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: MetodoPago,
            key: 'id_metodo_pago'
        }
    },
    id_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Estado,
            key: 'id_estado'
        },
        defaultValue: 8
    },
    nombre_cliente: {
        type: DataTypes.STRING,
        allowNull: true
    },
    id_empleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: 'id_empleado'
        }
    },
});

Factura.belongsTo(Cliente, { foreignKey: 'id_cliente' },
                  Employee, { foreignKey: 'id_empleado'},
                    MetodoPago, { foreignKey: 'id_metodo_pago'},
                    Estado, { foreignKey: 'id_estado' }

);

Cliente.hasMany(Factura, { foreignKey: 'id_cliente' });
Employee.hasMany(Factura, { foreignKey: 'id_empleado'});
MetodoPago.hasMany(Factura, { foreignKey: 'id_metodo_pago'});
Estado.hasMany(Factura, { foreignKey: 'id_estado'});