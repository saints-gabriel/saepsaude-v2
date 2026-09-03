import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';
import { User } from './user.models.js';

export const Atividades = sequelize.define('atividade', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    tipo_atividade: {
        type: DataTypes.ENUM("corrida", "caminhada", "trilha", "todos"),
        defaultValue: "todos",
        allowNull: false
    },

    distancia_percorrida: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    duracao_atividade: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    quantidade_calorias: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

});

Atividades.belongsTo(User, { foreignKey: 'usuario_id' })
User.hasMany(Atividades, { foreignKey: 'usuario_id' })