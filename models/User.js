import { DataTypes } from 'sequelize';
import db from '../db/config.js';
import bcrypt from 'bcrypt';

const User = db.define('tbb_users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirmacion: DataTypes.BOOLEAN,
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: true,  // Campo opcional
    }
}, {
    hooks: {
        beforeCreate: async function(user) {
            // Generamos la clave para el hasheo
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
});

export default User;
