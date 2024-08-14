import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';
import {Tercero} from '../models/tercero.model.js';
import {Cargo} from '../models/cargo.model.js';
import { Direccion } from './direccion/direccion.model.js';
import { Estado } from './estado.model.js';

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
      model: Tercero, // Referencia al modelo 
      key: 'id_tercero', // La clave primaria del modelo
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
  },
  id_direccion: {
    type: DataTypes.DATE,
    allowNull: false,    
    references: {
      model: Direccion, // Referencia al modelo 
      key: 'id_direccion', // La clave primaria del modelo
    },
  onDelete: 'CASCADE'
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: true,    
    references: {
      model: Estado, // Referencia al modelo 
      key: 'id_estado', // La clave primaria del modelo
    },
  onDelete: 'CASCADE'
  }
  });

  Employee.belongsTo(Tercero, { foreignKey: 'id_tercero' }, 
                      Cargo, { foreignKey: 'id_cargo' },
                    Direccion, {foreignKey: 'id_direccion' },
                  Estado, {foreignKey: 'id_estado' }); // Un empleado pertenece a un tercero y a un cargo
  Tercero.hasMany(Employee, { foreignKey: 'id_tercero' });
  Cargo.hasMany(Employee, { foreignKey: 'id_cargo' }); // Un cargo tiene muchos empleados
  Direccion.hasMany(Employee, { foreignKey: 'id_direccion' }); // Una dirección tiene muchos empleados
  Estado.hasMany(Employee, { foreignKey: 'id_estado' }); // Un estado tiene muchos empleados
  