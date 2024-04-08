const express = require('express');
const router = express.Router();
const user = require("./User");
//Chamando a biblioteca 
const bcrypt = require('bcryptjs');
const session = require("express-session");



router.get("/cadastro",(req,res)=>{
    res.render("cadastro")
});

router.post("/cadastros",(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;

    //Primeiro verificando se o email já foi cadastrado
    user.findOne({where:{Email: email}}).then( users =>{     //Se o usuario que ele achar for nulo 'undefined', ele sera criado 
        if(users == undefined){                          
            var salt = bcrypt.genSaltSync(10);              
            var hash = bcrypt.hashSync(password, salt);
            user.create({
                Email: email,
                Password: hash
            }).then(() => {
                res.redirect("/")
            }).catch((err) => {
                res.redirect("/")
            });
        }else{
            res.redirect("/cadastro")
        }
    })
    //Testando para ver se está recebendo as variaveis certas.
    //res.json({email,password});
});

router.get("/login",(req,res)=>{
    res.render("login")
});

router.post("/authenticate",(req,res) =>{
    var email = req.body.email;
    var password = req.body.password;
    //Verificando primeiro se o email é valido
    user.findOne({where:{Email: email}}).then( user => {
        if(user != undefined){  //Se o email for diferente de nulo, ele continua.
            var correct = bcrypt.compareSync(password, user.Password);  //Validando se a senha é a mesma
            if(correct){    //Se a senha for correta, ele cria a sessão guardando o Id e Email.
                req.session.user = {    //user é apenas um nome aleatorio.
                    id: user.id,
                    email: user.Email
                }
                res.json(req.session.user);
            }else{
                res.redirect("/login")
            }
        }else{
            res.redirect("/login")
        }
    })
});

module.exports = router;