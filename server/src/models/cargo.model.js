import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';

export const Cargo = sequelize.define('cargos',{
  id_cargo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  });