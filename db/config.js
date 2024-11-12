import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config({path: '.env'})

const db =new Sequelize (process.env.BD_NOMBRE,process.env.BD_USER, process.env.BD_PASS,{
    host: process.env.BD_DOMAIN,
    port:process.env.BD_PORT,
    dialect:'mysql',
    define:{
       timestamps: true //permite agarrar dos campos de registro
    },
    pool: {
        max:5, //conexiones máximas
        min:0,
        acquire:30000, //tiempo en milisegundos que están intentado hacer peticiones
        idle:10000 //tiempo de actividad máx, sino la duerme
    },
    operatorsAliases: false //Quita las alias, configuración
});

export default db;