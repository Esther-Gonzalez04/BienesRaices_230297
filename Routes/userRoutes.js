import express, { request, response } from 'express';
const router=express.Router();

//GET
router.get("/busquedaPorID",function(request,response){
    response.send(`Se está solicitando buscar el usuario con el ID ${request.params.id}`);
})

// 2 componentes de una petición


export default router;