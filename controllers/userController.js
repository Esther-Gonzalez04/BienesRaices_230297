
const formularioLogin=(rquest,response)=>{
        response.render("auth/login", {
            autenticado: false, 
            page: "Ingresa a la pltaforma"
})};

const formularioRegister=(rquest,response)=>{
        response.render("auth/register", {
            page: "Crea una nueva cuenta"
        
})};

const formularioPasswordRecovery=(rquest,response)=>{
    response.render("auth/passwordRecovery", {
        page: "Recupera tu contraseña"

})};

export {formularioLogin, formularioRegister, formularioPasswordRecovery}


