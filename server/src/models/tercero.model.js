import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';
import { Direccion } from './direccion/direccion.model.js';
import { Email } from './email.model.js';

export const Tercero = sequelize.define('terceros',{
  id_tercero: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  id_email: {
    type: DataTypes.STRING,
    allowNull: true,    
    references: {
      model: Email, // Referencia al modelo 
      key: 'id_email', // La clave primaria del modelo
    },
    onDelete: 'CASCADE'
  },
  id_direccion: {
    type: DataTypes.DATE,
    allowNull: true,    
    references: {
      model: Direccion, // Referencia al modelo 
      key: 'id_direccion', // La clave primaria del modelo
    },
  onDelete: 'CASCADE'
  },
});


  Tercero.belongsTo(Email, { foreignKey: 'id_email' }); // Un tercero pertenece a un email
  Email.hasMany(Tercero, { foreignKey: 'id_email' }); // Un email tiene muchos terceros

  Tercero.belongsTo(Direccion, { foreignKey: 'id_direccion' }); // Un tercero pertenece a una dirección
  Direccion.hasMany(Tercero, { foreignKey: 'id_direccion' }); // Una dirección tiene muchos terceros