const express = require('express');
const router = express.Router();
const user = require("./User");
//Chamando a biblioteca 
const bcrypt = require('bcryptjs');

router.get("/login",(req,res)=>{
    res.render("login")
});

router.get("/cadastro",(req,res)=>{
    res.render("cadastro")
});

router.post("/cadastros",(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    //Testando para ver se está recebendo as variaveis certas.
    res.json({email,password});
});

module.exports = router;