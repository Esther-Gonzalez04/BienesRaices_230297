import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config({path: '.env'})

const db =new Sequelize (process.env.BD_NOMBRE,process.env.BD_USER, process.env.BD_PASS,{
    host: process.env.BD_HOST,
    port:3307,
    dialect:'mysql',
    define:{
       timestamps: true
    },
    pool: {
        max:5,
        min:0,
        acquire:30000, //los minisegundos que va a estar haciendo peticiones y si no le contesta emite error 
        idle:10000 //la duerme y la pasa a una prioridad baja 
    },
    operatorsAliases: false
});

export default db;