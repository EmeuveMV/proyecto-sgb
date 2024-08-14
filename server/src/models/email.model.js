import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';
import { Estado } from './estado.model.js';

export const Email = sequelize.define('emails',{
    id_email: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Estado, // Referencia al modelo 
            key: 'id_estado', // La clave primaria del modelo
        },
      onDelete: 'CASCADE'
    },  
});

Email.belongsTo(Estado, { foreignKey: 'id_estado' }); // Un email pertenece a un estado
Estado.hasMany(Email, { foreignKey: 'id_estado' }); // Un estado tiene muchos emails