import express from 'express';
const router=express.Router();

router.get("/", function(req,res){
    res.send("Hola mundo desde Node, a través del navegador")
})

router.get("/QuienSoy", function(req, res){
    res.json({"estudiante": "Esther Gonzalez Peralta",
        "carrera": "TI DSM",
        "grado": "4°",
        "grupo":"B",
        "asignatura": "Aplicaciones web orientada a servicios"

    })
})

export default router;