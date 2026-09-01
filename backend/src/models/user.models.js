import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

export const User = sequelize.define('user', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    nomeDeUsuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    imagem:{
    type: DataTypes.STRING,
        allowNull: false
    },

    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    }

});