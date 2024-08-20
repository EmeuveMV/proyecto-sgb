import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';
import { Cita } from './cita.model.js';
import { Servicio } from './servicio.model.js';

export const DetalleCita = sequelize.define('detallescitas',{
    id_detalle_cita: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_cita: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cita,
            key: 'id_cita'
        }
      },
      id_servicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Servicio,
            key: 'id_servicio'
        }
      },
})

DetalleCita.belongsTo(Cita, { foreignKey: 'id_cita' },
                       Cita, { foreignKey: 'id_servicio'}
)

Cita.hasMany(DetalleCita, { foreignKey: 'id_cita'})
Servicio.hasMany(DetalleCita, { foreignKey: 'id_servicio'})