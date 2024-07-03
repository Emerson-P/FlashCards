//Arquivo responsavel por acessar o banco de dados
const Sequelize = require('sequelize');

    //senha do banco salvo como variavel de ambiente por segurança
    var senha_sqq = process.env.senha_sql

    //Acesso ao banco 
    const sequelize = new Sequelize('projeto_cards','root',process.env.senha_sql,{
        host:'localhost',
        dialect:'mysql'
    });


module.exports = sequelize   