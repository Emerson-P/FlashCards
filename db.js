const Sequelize = require('sequelize');

    var senha_sqq = process.env.senha_sql
    const sequelize = new Sequelize('projeto_cards','root',process.env.senha_sql,{
        host:'localhost',
        dialect:'mysql'
    });

module.exports = sequelize   