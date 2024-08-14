import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';

export const Rol = sequelize.define('roles',{
  id_rol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  });