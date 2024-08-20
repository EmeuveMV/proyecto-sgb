import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';
import { Servicio } from './servicio.model.js';
import { Cliente } from './cliente.model.js';
import { Employee } from './empleado.model.js';
import { Estado } from './estado.model.js';
import { Direccion } from './direccion/direccion.model.js';

export const Cita = sequelize.define('citas', {
    id_cita: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
        allowNull: true,
        references: {
            model: Servicio,
            key: 'id_servicio' // Cambiar 'id' por el nombre de la clave primaria de Servicio
        }
    },
    fecha_cita: {
        type: DataTypes.DATE,
        allowNull: false
    },
    nombre_cliente: {
        type: DataTypes.STRING,
        allowNull: true
    },
    id_estado: {
        type: DataTypes.TEXT, // Cambiar a DataTypes.BIT si tu dialecto lo soporta
        allowNull: true,
        defaultValue: 3,
        references: {
            model: Estado,
            key: 'id_estado' // Cambiar 'id' por el nombre de la clave primaria de Estado
        }
    },
    comentario: {
        type: DataTypes.TEXT
    },
    id_direccion: {
        type: DataTypes.INTEGER,
        allowNull: true,
       
    }
});

// Definir las asociaciones
Cita.belongsTo( Cliente, { foreignKey: 'id_cliente' },
                Employee, { foreignKey: 'id_empleado' },
                Servicio, { foreignKey: 'id_servicio' },
                Estado, { foreignKey: 'id_estado' },
                Direccion, { foreignKey: 'id_direccion'});

Cliente.hasMany(Cita, { foreignKey: 'id_cliente' });
Employee.hasMany(Cita, { foreignKey: 'id_empleado' });
Servicio.hasMany(Cita, { foreignKey: 'id_servicio' });
Estado.hasMany(Cita, { foreignKey: 'id_estado' });
Direccion.hasMany(Cita, { foreignKey: 'id_direccion' });