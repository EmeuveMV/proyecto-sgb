import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';
import { Servicio } from './servicio.model.js';
import { Cliente } from './cliente.model.js';
import { Employee } from './empleado.model.js';

export const Cita = sequelize.define('citas', {
    id_cita: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cliente,
            key: 'id_cliente' // Cambiar 'id' por el nombre de la clave primaria de Cliente
        }
    },
    id_empleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: 'id_empleado' // Cambiar 'id' por el nombre de la clave primaria de Empleado
        }
    },
    id_servicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Servicio,
            key: 'id_servicio' // Cambiar 'id' por el nombre de la clave primaria de Servicio
        }
    },
    fecha_cita: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estado: {
        type: DataTypes.TEXT, // Cambiar a DataTypes.BIT si tu dialecto lo soporta
        allowNull: false
    },
    comentario: {
        type: DataTypes.TEXT
    }
});

// Definir las asociaciones
Cita.belongsTo(Cliente, { foreignKey: 'id_cliente' });
Cita.belongsTo(Employee, { foreignKey: 'id_empleado' });
Cita.belongsTo(Servicio, { foreignKey: 'id_servicio' });

Cliente.hasMany(Cita, { foreignKey: 'id_cliente' });
Employee.hasMany(Cita, { foreignKey: 'id_empleado' });
Servicio.hasMany(Cita, { foreignKey: 'id_servicio' });
