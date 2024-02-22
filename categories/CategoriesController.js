const express = require('express');
const router = express.Router();
const category = require("./Category");
const slugify = require('slugify');

// Router é a mesma coisa que o app
router.get("/admin/categories/new",(req,res) => {
    res.render("admin/categories/new")
});

router.get("/admin/categories",(req,res)=>{
    res.render("admin/categories/index")
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

module.exports = router;