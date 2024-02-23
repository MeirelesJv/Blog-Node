const express = require("express");
const router = express.Router();
const category = require("../categories/category");
const article = require("./Article");
const slugify = require("slugify");

// Router é a mesma coisa que o app
router.get("/admin/articles",(req,res) => {
    res.send("articles")
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
            res.redirect('/');
        })
    }else{
        res.redirect('/admin/articles/new');
    }
});

module.exports = router;
