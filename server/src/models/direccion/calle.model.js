import { DataTypes } from 'sequelize';
import { sequelize } from '../../../database/connection.js';

import {Sector} from './sector.model.js';

export const Calle = sequelize.define('calles', {
    id_calle: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_calle: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    id_sector: {
        type: DataTypes.INTEGER,
        references: {
            model: Sector,
            key: 'id_sector'
        }
    }
});


Calle.belongsTo(Sector, { foreignKey: 'id_sector' });
Sector.hasMany(Calle, { foreignKey: 'id_sector' });