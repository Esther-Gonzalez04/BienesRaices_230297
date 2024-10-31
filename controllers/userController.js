
const formularioLogin=(rquest,response)=>{
        response.render("auth/login", {
            autenticado: false 
})};

const formularioRegister=(rquest,response)=>{
        response.render("auth/register", {
        
})};

const formularioPasswordRecovery=(rquest,response)=>{
    response.render("auth/passwordRecovery", {

})};

export {formularioLogin, formularioRegister, formularioPasswordRecovery}


