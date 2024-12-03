import { check, validationResult } from 'express-validator';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import csrf from 'csurf';
import { generatetid } from '../helpers/tokens.js';
import { emailAfterRegister,passwordRecoveryEmail    } from '../helpers/email.js';
import moment from 'moment';
// Renderizar formulario de inicio de sesión
const formularioLogin = (req, res) => {
    res.render('auth/login', {
        autenticado: false,
        page: 'Ingresa a la plataforma',
    });
};

// Renderizar formulario de registro
const formularioRegister = (req, res) => {
    res.render('auth/register', {
        page: 'Crea una nueva cuenta',
        nombre_usuario: '',  // Inicializamos vacíos los campos
        correo_usuario: '',
    });
};

// Crear un nuevo usuario
const createNewUser = async (req, res) => {
    // Realizar validaciones en los campos del formulario
    await check('nombre_usuario').notEmpty().withMessage('El nombre no puede ir vacío').run(req);
    await check('correo_usuario').notEmpty().withMessage('El correo electrónico es un campo obligatorio')
        .isEmail().withMessage('No es un email correcto').run(req);
    await check('pass_usuario').notEmpty().withMessage('La contraseña es un campo obligatorio')
        .isLength({ min: 8 }).withMessage('La contraseña debería tener al menos 8 caracteres').run(req);
    await check('pass2_usuario').equals(req.body.pass_usuario).withMessage('Las contraseñas no coinciden').run(req);
    await check('fecha_nacimiento').notEmpty().withMessage('La fecha de nacimiento es obligatoria')
        .isDate().withMessage('La fecha no es válida').run(req);

    // Verificar los resultados de las validaciones
    const result = validationResult(req);

    // Si hay errores, regresar al formulario con los mensajes y los valores ingresados por el usuario
    if (!result.isEmpty()) {
        return res.render('auth/register', {
            page: 'Error al intentar crear la cuenta',
            errors: result.array(),
            nombre_usuario: req.body.nombre_usuario,  // Mantener el nombre ingresado
            correo_usuario: req.body.correo_usuario,  // Mantener el correo ingresado
            fecha_nacimiento: req.body.fecha_nacimiento, // Mantener la fecha de nacimiento
        });
    }

    // Desestructurar los parámetros del request
    const { nombre_usuario: name, correo_usuario: email, pass_usuario: password, fecha_nacimiento } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.render('auth/register', {
            page: 'Error al intentar crear la cuenta de Usuario',
            errors: [{ msg: `El usuario ${email} ya está registrado.` }],
            nombre_usuario: name,  // Mantener el nombre ingresado
            correo_usuario: email, // Mantener el correo ingresado
            fecha_nacimiento, // Mantener la fecha de nacimiento ingresada
        });
    }

    // Convertir la fecha de nacimiento a UTC
    const fechaNacimiento = moment(req.body.fecha_nacimiento).utc().format('YYYY-MM-DD HH:mm:ss');

    // Crear un nuevo usuario
    const newUser = await User.create({
        name,
        email,
        password,
        fecha_nacimiento: fechaNacimiento,  // Almacenar la fecha de nacimiento en UTC
        token: generatetid(),  // Generar un token para la confirmación
    });

    // Enviar correo de confirmación
    emailAfterRegister({
        name: newUser.name,
        email: newUser.email,
        token: newUser.token,
    });

    // Mostrar un mensaje de éxito
    res.render('templates/message', {
        page: 'Cuenta creada correctamente',
        message: `Hemos enviado un email de confirmación al correo: ${email}`,
    });
};


// Confirmar cuenta (si el usuario hace clic en el enlace de confirmación del correo)
const confirm = async (req, res) => {
    const { token } = req.params;

    // Verificar si el token es válido
    const user = await User.findOne({ where: { token } });
    if (!user) {
        return res.render('auth/confirmAccount', {
            page: 'Error al confirmar tu cuenta...',
            msg: 'Hubo un error al confirmar tu cuenta, intenta de nuevo.',
            error: true,
        });
    }

    // Confirmar la cuenta
    user.token = null;  // Eliminar el token
    user.confirmacion = true;  // Marcar la cuenta como confirmada
    await user.save();  // Guardar cambios en la base de datos

    res.render('auth/confirmAccount', {
        page: 'Cuenta Confirmada',
        msg: 'La cuenta se ha confirmado correctamente.',
        error: false,
    });
};

// Renderizar formulario de recuperación de contraseña
const formularioPasswordRecovery = (req, res) => {
    res.render('auth/passwordRecovery', {
        page: 'Recupera tu contraseña',
    });
};
const resetPassword = async (req, res) => {
    await check('correo_usuario')
        .notEmpty().withMessage('El correo electrónico es un campo obligatorio')
        .isEmail().withMessage('El correo electrónico no tiene el formato correcto')
        .run(req);

    let resultado = validationResult(req);

    if (!resultado.isEmpty()) {
        return res.render('auth/register', {
            page: 'Recupera tu acceso a Bienes Raices',
            csrfToken: req.csrfToken(),
            errors: resultado.array()
        });
    }

    const { correo_usuario } = req.body;

    // Buscar el usuario
    const user = await User.findOne({ where: { email: correo_usuario } });
    if(!user){
        return res.render('auth/passwordRecovery', {
            page: 'Recupera tu acceso a Bienes Raices',
            csrfToken: req.csrfToken(),
            errors: [{msg:'UPSSS, El Correo no Pertenece a ningún usuario'}]
        });
    }
    //Generar un token y enviar un email
    user.token=generatetid();
    await user.save();

    //Enviar un Email
    passwordRecoveryEmail({
        email: user.email,
        name: user.name,
        token: user.token

    })
    //Renderizar un mensaje 
    res.render('templates/message',{
        page:'Restablece tu Contraseña',
        msg:`Hemos Enviado un Email con las instrucciones para Reestablecer su contraseña`
    })

};


const checkToken = async(req,res)=>{
    const { token } =req.params;
    const user=await User.findOne({where: {token}})
    if(!user){
        return res.render('auth/confirmAccount',{
            page:'Restablece tu Contraseña...',
            msg:'Hubo un error al validar tu información , intenta de nuevo..',
            error:true
        })
    }

    //Formulario para modificar el password
    res.render('auth/reset-password',{
        page: 'Restablece tu Contraseña',
        csrfToken: req.csrfToken()

    })
}
const newPassword= async(req,res)=>{
    //Validar el password
    await check('new_password')
        .notEmpty().withMessage('La contraseña es un campo obligatorio')
        .isLength({ min: 8 }).withMessage('El Password debe ser de al menos 8 caracteres')
        .run(req);
    await check('new_password2')
        .equals(req.body.new_password).withMessage('La contraseña debe coincidir con la anterior')
        .run(req);

    let resultado = validationResult(req);
    // Verificamos que el resultado esté vacío
    if (!resultado.isEmpty()) {
        // Errores
        return res.render('auth/passwordRecovery', {
            page: 'Reestablece tu Contraseña',
            csrfToken: req.csrfToken(),
            errors: resultado.array()
        });
    }
    const { token }=req.params
    const {new_password}=req.body
    //Identificar quien hace el cambio
    const user =await User.findOne({where:{token}})

    //  Hashear el nuevo password
    const salt= await bcrypt.genSalt(10)
    user.password=await bcrypt.hash(new_password,salt);
    user.token=null;

    await user.save();

    res.render('auth/confirmAccount',{
        page: 'Password Reestablecido',
        msg:'El password se Guardó correctamente '
    })
}

export {
    formularioLogin,
    formularioRegister,
    createNewUser,
    confirm,
    formularioPasswordRecovery,
    resetPassword,
    checkToken,
    newPassword
};
