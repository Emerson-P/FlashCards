const Sequelize = require('sequelize');
const db = require('../db');


class user_tabela {
    constructor(){
        this.user_tabela = db.define('user',{
            id:{
                type:Sequelize.INTEGER,
                autoIncrement:true,
                allowNull:false,
                primaryKey:true
            },
            nome:{
                type:Sequelize.TEXT,
                allowNull:false,
            },
            email:{
                type:Sequelize.TEXT,
                allowNull:false,
            },
            senha:{
                type:Sequelize.TEXT,
                allowNull:false,
            }
        });
    }

    async insert(nome,email,senha){
        await this.user_tabela.sync();

        await this.user_tabela.create({
            nome,
            email,
            senha
        })

    }

    async select(attributes,where){
        await this.user_tabela.sync();
        
        const select = await this.user_tabela.findAll({
            attributes,
            where,
        })

        console.log(select) 
    }

    async update(attributet,where){
        await this.user_tabela.sync();
        
        const select = await this.user_tabela.update(attributet,{where})

 
    }

    async delete(where){
        await this.user_tabela.sync();
        
        const select = await this.user_tabela.destroy({where})

 
    }


}

var teste = new user_tabela()

teste.insert('emerson','teste','123')
var attributes = {
    nome:'claudio'
}
var where = {
    id:1
}

// teste.update(attributes,where)
// teste.select(['id','nome'],{id:1})
// teste.delete(where)

module.exports = function(){
    return user_tabela()
}