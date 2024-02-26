const express = require("express");
const router = express.Router();
const category = require("../categories/Category");
const article = require("./Article");
const slugify = require("slugify");

// Router é a mesma coisa que o app
router.get("/admin/articles",(req,res) => {
    article.findAll({
        include: [{model: category}] //Inclui a categoria pois as duas estão relacionadas 
    }).then(articles =>{
    res.render("admin/articles/index",{articles: articles});
    })  
});

router.get("/admin/articles/new",(req,res) => {
    category.findAll().then(categories =>{
        res.render("admin/articles/new",{categories: categories})
    })   
});

router.post("/articles/save",(req,res) => {
    var title = req.body.title;
    var body = req.body.bodyArtigo;
    var category = req.body.category;
    //ser o title for 
    if(title != undefined && body != undefined ){
        article.create({
            title: title,
            slug: slugify(title), // Slug é quando pegamos algum texto e no lugar do espaço, colocamos o -
            body: body,
            catId: category
        }).then(()=>{
            res.redirect('/admin/articles');
        })
    }else{
        res.redirect('/admin/articles/new');
    }
});

router.post("/articles/delete", (req,res) => {
    var id = req.body.id;
    if(id != undefined) { /* Se ele for Null*/
        if(!isNaN(id)){ /*Se ele nao for um numero*/
            //.destroy serve para deletar no banco
            article.destroy({
                where: {
                    id:id
                }
            }).then(()=>{
                res.redirect("/admin/articles");
            });

        }else{
            res.redirect("/admin/articles");
        }
    }else{
        res.redirect("/admin/articles");
    }
});

module.exports = router;