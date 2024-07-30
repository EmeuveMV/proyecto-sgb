import { DataTypes } from 'sequelize';
import { sequelize } from '../../../database/connection.js';
import {Provincia} from './provincia.model.js';

export const Municipio = sequelize.define('municipios', {
    id_municipio: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    municipio: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    id_provincia: {
        type: DataTypes.INTEGER,
        references: {
            model: Provincia,
            key: 'id_provincia'
        }
    }
});

Municipio.belongsTo(Provincia, { foreignKey: 'id_provincia' });
Provincia.hasMany(Municipio, { foreignKey: 'id_provincia' });
