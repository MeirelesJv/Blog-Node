//Importando o Sequelize.
const sequelize = require("sequelize");
//Importando a conexão com o banco.
const connection = require("../database/database");

//Configurando a tabela
const Users = connection.define('Users',{
    Email:{
        type: sequelize.STRING,
        allowNull: false
    },
    Password:{
        type: sequelize.STRING,
        allowNull: false
    }
});

//Caso já tenha a tabela, não cria outra
Users.sync({force: false}).then(()=>{});

//Exportando a Const Users
module.exports = Users;