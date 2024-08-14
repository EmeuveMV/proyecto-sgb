import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';

export const TipoServicio = sequelize.define('tiposervicio', {
    id_tipo_servicio: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
},
    {
        tableName: 'tiposervicio'  // Especificar el nombre de la tabla
}); 