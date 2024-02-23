const express = require('express');
const router = express.Router();
const category = require("./Category");
const slugify = require('slugify');
const { where } = require('sequelize');

// Router é a mesma coisa que o app
router.get("/admin/categories/new",(req,res) => {
    res.render("admin/categories/new")
});

router.get("/admin/categories", (req,res) => {
    category.findAll({raw: false}).then(categories => {
        res.render("admin/categories/index", {
            categories: categories
        });
    });
});

router.post("/categories/save",(req,res) => {
    var title = req.body.title;
    //ser o title for 
    if(title != undefined){
        category.create({
            title: title,
            slug: slugify(title) // Slug é quando pegamos algum texto e no lugar do espaço, colocamos o -
        }).then(()=>{
            res.redirect('/admin/categories');
        })
    }else{
        res.redirect('/admin/categories/new');
    }
});

router.post("/categories/update",(req,res) => {
    var id = req.body.id;
    var title = req.body.title;
    //ser o title for 
    category.update({title: title, slug: slugify(title)},{
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/categories");
    })
});

router.post("/categories/delete", (req,res) => {
    var id = req.body.id;
    if(id != undefined) { /* Se ele for Null*/
        if(!isNaN(id)){ /*Se ele nao for um numero*/
            //.destroy serve para deletar no banco
            category.destroy({
                where: {
                    id:id
                }
            }).then(()=>{
                res.redirect("/admin/categories");
            });

        }else{
            res.redirect("/admin/categories");
        }
    }else{
        res.redirect("/admin/categories");
    }
});

router.get("/admin/categories/edit/:id", (req,res) => {
    var id = req.params.id;
    if(isNaN(id)){ // Se ele nao for apenas numero, redireciona
        res.redirect("/admin/categories");
    }
    category.findByPk(id).then(category => { // Metedo mais rapido para pesquisar por ID
        if(category != undefined){  
            res.render("admin/categories/edit",{category: category})
        }else{
            res.redirect("/admin/categories");
        }
    }).catch(erro => { //se der erro ele ira redirecionar para categories
        res.redirect("/admin/categories");
    })
});

module.exports = router;