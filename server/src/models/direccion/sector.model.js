import { DataTypes } from 'sequelize';
import { sequelize } from '../../../database/connection.js';

import {Municipio} from './municipio.model.js';

export const Sector = sequelize.define('sectores', {
    id_sector: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    sector_barrio: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    id_municipio: {
        type: DataTypes.INTEGER,
        references: {
            model: Municipio,
            key: 'id_municipio'
        }
    }
});

Sector.belongsTo(Municipio, { foreignKey: 'id_municipio' });
Municipio.hasMany(Sector, { foreignKey: 'id_municipio' });
