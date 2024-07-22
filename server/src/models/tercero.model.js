import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';

export const Tercero = sequelize.define('terceros',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birth: {
    type: DataTypes.DATE,
    allowNull: false
  },
  });