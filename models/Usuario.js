import{DataTypes} from 'sequelize'
import db from '../config/db.js'

const Usuario = db.define('tbb_users',{
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false
    },
    token:{
        type:DataTypes.STRING,
        
    },
    token:DataTypes.STRING,
    confirmed:DataTypes.BOOLEAN
})

export default User;