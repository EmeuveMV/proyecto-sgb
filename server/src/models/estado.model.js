import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';


export const Estado = sequelize.define('estados',{
    id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    }
});