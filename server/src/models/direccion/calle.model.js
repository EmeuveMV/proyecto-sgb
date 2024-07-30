import { DataTypes } from 'sequelize';
import { sequelize } from '../../../database/connection.js';

import {NumeroCasa} from './numerocasa.model.js';
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
    id_numero_casa: {
        type: DataTypes.INTEGER,
        references: {
            model: NumeroCasa,
            key: 'id_numero_casa'
        }
    },
    id_sector: {
        type: DataTypes.INTEGER,
        references: {
            model: Sector,
            key: 'id_sector'
        }
    }
});

Calle.belongsTo(NumeroCasa, { foreignKey: 'id_numero_casa' });
NumeroCasa.hasMany(Calle, { foreignKey: 'id_numero_casa' });

Calle.belongsTo(Sector, { foreignKey: 'id_sector' });
Sector.hasMany(Calle, { foreignKey: 'id_sector' });