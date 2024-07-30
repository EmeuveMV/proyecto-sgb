import { DataTypes } from 'sequelize';
import { sequelize } from '../../../database/connection.js';


export const NumeroCasa = sequelize.define('numeroscasa', {
    id_numero_casa: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    numerocasa: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});
