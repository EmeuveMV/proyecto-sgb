import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';
import {Tercero} from '../models/tercero.model.js';

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
    fecha_registro: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
});

// Definir las asociaciones
Cliente.belongsTo(Tercero, { foreignKey: 'id_tercero' });
Tercero.hasMany(Cliente, { foreignKey: 'id_tercero' });
