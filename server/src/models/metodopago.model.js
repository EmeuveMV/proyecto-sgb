import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';

export const MetodoPago = sequelize.define('metodopagos', {
    id_metodo_pago: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
});