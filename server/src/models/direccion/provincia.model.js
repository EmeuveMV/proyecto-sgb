import { DataTypes } from 'sequelize';
import { sequelize } from '../../../database/connection.js';

export const Provincia = sequelize.define('provincias', {
    id_provincia: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    provincia: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    }
});
