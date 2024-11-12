import { request } from 'express'
import User from '../models/User.js'


const formularioLogin=(rquest,response)=>{
        response.render("auth/login", {
            autenticado: false, 
            page: "Ingresa a la plataforma"
})};

const formularioRegister=(rquest,response)=>{
        response.render("auth/register", {
            page: "Crea una nueva cuenta"
        
})};

const createNewUser = async (req, res) =>{
    console.log('Registrando...');
    console.log(req.body);

    const newUser= await User.create({
        name: req.body.nombre_usuario,
        email: req.body.correo_usuario,
        password: req.body.pass_usuario,
    })
    res.json(newUser)

}

const formularioPasswordRecovery=(rquest,response)=>{
    response.render("auth/passwordRecovery", {
        page: "Recupera tu contraseña"

})};

export {formularioLogin, formularioRegister, createNewUser, formularioPasswordRecovery}


