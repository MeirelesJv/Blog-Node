const express = require('express');
const router = express.Router();
const category = require("./Category");
const slugify = require('slugify');

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
            res.redirect('/');
        })
    }else{
        res.redirect('/admin/categories/new');
    }
});

router.post("/categories/delete", (req,res) => {
    var id = req.body.id;
    if(id != undefined/* Se ele for Null*/) {
        if(isNaN(id)/*Se ele nao for um numero*/){
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

module.exports = router;