import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';
import {TipoServicio} from '../models/tiposervicio.model.js';

export const Servicio = sequelize.define('servicios', {
    id_servicio: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    servicio: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    duracion_servicio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    id_tipo_servicio: {
        type: DataTypes.INTEGER,
        references: {
            model: TipoServicio,
            key: 'id_tipo_servicio' 
        }
    }
});

// // Definir la asociación
Servicio.belongsTo(TipoServicio, { foreignKey: 'id_tipo_servicio' });
// TipoServicio.hasMany(Servicio, { foreignKey: 'id_tipo_servicio' });