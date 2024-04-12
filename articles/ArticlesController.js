const express = require("express");
const router = express.Router();
const category = require("../categories/Category");
const article = require("./Article");
const slugify = require("slugify");
const loginAuth = require("../middleware/loginAuth")

// Router é a mesma coisa que o app
router.get("/admin/articles",loginAuth,(req,res) => {
    article.findAll({
        include: [{model: category}] //Inclui a categoria pois as duas estão relacionadas 
    }).then(articles =>{
    res.render("admin/articles/index",{articles: articles});
    })  
});

router.get("/admin/articles/new",loginAuth,(req,res) => {
    category.findAll().then(categories =>{
        res.render("admin/articles/new",{categories: categories})
    })   
});

router.post("/articles/save",loginAuth,(req,res) => {
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

router.post("/articles/delete", loginAuth,(req,res) => {
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

//Criando a rota de edição e mandando as informações das cabelas Article e Category para poder ser acessado
router.get("/admin/article/edit/:id", loginAuth,(req, res) => {
    var id = req.params.id;

    article.findByPk(id).then(article => { // Metedo mais rapido para pesquisar por ID
     if(article != undefined){
   
        category.findAll().then(categories => {
          res.render("admin/articles/edit", {categories: categories, article: article})
        })
        
     }else{
         res.redirect("/admin/articles");
     }
    }).catch(erro => {
        res.redirect("/admin/articles");
    })
  });

router.post("/article/update",loginAuth,(req,res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;
    //ser o title for 
    article.update({title: title, slug: slugify(title),body: body,catId: category},{
        where: { //Id pegado do campo input hidden
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/articles");
    }).catch(erro => {
        res.redirect("/admin/articles");
    })
});


//Sistema de Paginação:
router.get("/articles/page/:num",loginAuth,(req,res)=>{
    var page = req.params.num;
    var offset = 0;

    //Verificando se a pagina nao for um numero ou 0, se nao for, offset é 0
    if(isNaN(page) || page <= 1){
        offset = 0;
    }else{ //Converter um valor de texto em valor numero com parseInt
        offset = (parseInt(page) -1) * 6;
    }

    //Mesma coisa que o metodo finAll, mas com esse ele retorna com a contage geral do Banco
    //Ele irá retorar => Count: Numero de artigos, => Rows: Que são os artigos
    article.findAndCountAll({
        limit: 6,
        offset: offset,
        order: [['id', 'DESC']],
        include: {model: category}
    }).then(articles => {
    
        var next;
        if(offset + 6 >= articles.count){
            next = false;
        }else{
            next = true;
        }

        var result = {
            page: parseInt(page),
            next: next,
            articles: articles
        }

        category.findAll().then(category =>{    //articles já está na variavel result
            res.render("admin/articles/page",{result: result, category: category})
        });
    })

})

module.exports = router;