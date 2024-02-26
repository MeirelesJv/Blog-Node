const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const connection = require("./database/database");
const Articles = require("./articles/Article");
const Category = require("./categories/Category");

// Connection
app.listen(8080, () => {console.log("Sevidor Iniciado")})

// BodyParse
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());

// Linkando a categoria com o index
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
// Fazendo o sistema usar as rotas da const indicada | "/" é o prefixo que sera usando antes de qualquer outro da categoria 
app.use("/",categoriesController,articlesController);

// View engine
app.set('view engine','ejs');

// Static
app.use(express.static('public'));

// Database
connection.authenticate().then(() =>{
        console.log("Banco conectado!");
    }).catch((error) =>{
        console.log(error);
    })


app.get("/",(req,res) =>{  
    Articles.findAll({order: [['id','DESC']],
        include: [{model: Category}]}).then(articles =>{
        res.render("index",{articles: articles})
    })
});

app.get("/login",(req,res) => {
    res.render("login")
});

app.get("/article/:slug",(req,res)=>{
    var slug = req.params.slug;
    Articles.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            res.render("article",{article: article});
        }else{
            res.redirect("/");
        }
    }).catch(err =>{
        res.redirect("/");
    });
});

app.get("/category/:id",(req,res)=>{
    var id = req.params.id;
    Category.findOne({
        where: {
            id: id
        }
    }).then(category => {
        if(category != undefined){
            res.render("",{category: category});
        }else{
            res.redirect("/");
        }
    }).catch(err =>{
        res.redirect("/");
    });
});