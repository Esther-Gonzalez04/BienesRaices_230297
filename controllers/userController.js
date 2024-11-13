
import{check, validationResult} from 'express-validator'
import { request, response } from 'express'
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

    await check('nombre_usuario').notEmpty().withMessage('El nombre no puede ir vacío').run(req)
    await check('correo_usuario').notEmpty().withMessage('El correo electrónico es un campo obligatorio').isEmail().withMessage('No es un email correcto').run(req)
    await check('pass_usuario').notEmpty().withMessage('La contraseña es un campo obligatorio').isLength({min:8}).withMessage('La contraseña debería tener al menos 8 carácteres').run(req)
    await check('pass2_usuario').equals(req.body.pass_usuario).withMessage('La contraseña no coinciden').run(req)


    let result= validationResult(req)

    //return res.json
    //validación que el resultado este vacío
    if(!result.isEmpty()){
        return res.render('auth/register',{
            page: 'Error al intentar crear la cuenta',
            errors: result.array()
        })
    }

    else{

        console.log("Registrando a nuevo usuario");
        console.log(req.body);
        

        //registrando los datos en la base de datos.
        const newUser= await User.create({
            name: req.body.nombre_usuario,
            email: req.body.correo_usuario,
            password: req.body.pass_usuario,
        })
    
    }
    res.json(newUser)
}

const formularioPasswordRecovery=(rquest,response)=>{
    response.render("auth/passwordRecovery", {
        page: "Recupera tu contraseña"

})};

export {formularioLogin, formularioRegister, createNewUser, formularioPasswordRecovery}


