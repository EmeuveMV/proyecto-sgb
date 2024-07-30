import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';
import {Tercero} from '../models/tercero.model.js';
import {Direccion} from '../models/direccion/direccion.model.js'; //

export const Cliente = sequelize.define('clientes', {
    id_cliente: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_tercero: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tercero,
            key: 'id_tercero' // Cambiar 'id' por el nombre de la clave primaria de Tercero
        }
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    fecha_registro: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    id_direccion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Direccion,
            key: 'id_direccion' // Cambiar 'id' por el nombre de la clave primaria de Direccion
        }
    }
});

// Definir las asociaciones
Cliente.belongsTo(Tercero, { foreignKey: 'id_tercero' });
Cliente.belongsTo(Direccion, { foreignKey: 'id_direccion' });

Tercero.hasMany(Cliente, { foreignKey: 'id_tercero' });
Direccion.hasMany(Cliente, { foreignKey: 'id_direccion' });
