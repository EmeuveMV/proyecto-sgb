import { DataTypes } from 'sequelize';
import { sequelize } from '../../../database/connection.js';
import { Calle } from './calle.model.js';

export const Direccion = sequelize.define('direcciones', {
    id_direccion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_calle: {
        type: DataTypes.INTEGER,
        references: {
            model: Calle,
            key: 'id_calle'
        }
    }
});

Direccion.belongsTo(Calle, { foreignKey: 'id_calle' });
Calle.hasMany(Direccion, { foreignKey: 'id_calle' });