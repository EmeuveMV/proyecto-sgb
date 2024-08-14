import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';
import { Tercero } from './tercero.model.js';
import { Rol } from './rol.model.js';

export const Usuario = sequelize.define('usuarios',{
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_tercero: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Tercero,
        key: 'id_tercero' // Cambiar 'id' por el nombre de la clave primaria de Tercero
    }
  },
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    references: {
        model: Rol,
        key: 'id_rol' // Cambiar 'id' por el nombre de la clave primaria de Rol
    }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_registro: {
    type: DataTypes.DATE,
    allowNull: false
  }
  });

// Definir las asociaciones
Usuario.belongsTo( Tercero, { foreignKey: 'id_tercero' },
                   Rol, { foreignKey: 'id_rol' });
Tercero.hasMany(Usuario, { foreignKey: 'id_tercero' });
Rol.hasMany(Usuario, { foreignKey: 'id_rol' });


