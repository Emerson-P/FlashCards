//Arquivo responsavel por gerenciar toda consulta ao banco
const Sequelize = require('sequelize');
const db = require('../db');


class user_tabela {
    constructor(){
        //Definção da tabela acessada
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

        if(select == ''){
            return false
        }else{
            return true
        }
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


module.exports = new user_tabela()
