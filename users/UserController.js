const express = require('express');
const router = express.Router();
const user = require("./User");

router.get("/login",(req,res)=>{
    res.render("login")
});

router.get("/cadastro",(req,res)=>{
    res.render("cadastro")
});

router.post("/cadastros",(req,res)=>{
    var Email = req.params.Email;
    var Password = req.params.Password;

    user.create({
        
    }).then(() => {
        res.render("/")
    }).catch((err) => {
        res.redirect("/login")
    });
});

module.exports = router;