import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';
import {Tercero} from '../models/tercero.model.js';
import {Cargo} from '../models/cargo.model.js';

export const Employee = sequelize.define('empleados',{
  id_empleado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_tercero: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Tercero, // Referencia al modelo Departamento
      key: 'id', // La clave primaria de Departamento
    },
    onDelete: 'CASCADE'
  },  
  id_cargo: {
    type: DataTypes.INTEGER,
    references: {
      model: Cargo, // Referencia al modelo cargo
      key: 'id_cargo', // La clave primaria de cargo
    },
    onDelete: 'CASCADE', // Opción de eliminación en cascada
  },
  fecha_contratacion: {
    type: DataTypes.DATE,
    allowNull: false
  }
  });

  Employee.belongsTo(Tercero, { foreignKey: 'id_tercero' }, Cargo, { foreignKey: 'id_cargo' }); // Un empleado pertenece a un tercero y a un cargo