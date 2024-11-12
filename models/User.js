import{DataTypes} from 'sequelize'
import db from '../db/config.js'

const User = db.define('tbb_users',{
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirmacion: DataTypes.BOOLEAN
})

export default User;