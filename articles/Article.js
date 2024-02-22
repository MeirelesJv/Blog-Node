const sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define('articles',{
    title:{
        type: sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: sequelize.STRING,
        allowNull: false
    },
    body:{
        type: sequelize.TEXT,
        allowNull: false
    }
})

//Tem muitos ... | Relacionamento 1 por Muitos | foreignKey é qual o nome da coluna que vai vir relacionada
Category.hasMany(Article, { foreignKey: 'catId' });
// belongsTo = Pertence a uma ... | Relacionamento 1 para 1.
Article.belongsTo(Category, { foreignKey: 'catId' });

Article.sync({force: false}).then(()=>{});

module.exports = Article;