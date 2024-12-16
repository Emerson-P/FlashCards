const Sequelize = require('sequelize');
const db = require('../db');



class deck_tabela {
    constructor(){
        //Definção da tabela acessada
        this.deck_tabela = db.define('decks',{
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
            id_user:{
                type:Sequelize.INTEGER,
                allowNull:false,
                foreignkey:true
            },
            num_cards:{
                type:Sequelize.INTEGER
            }
        });
    }

    async insert(nome,id_user){
        await this.deck_tabela.sync();

        await this.deck_tabela.create({
            nome,
            num_cards : 0 ,
            id_user
        })
        
    }

    

    async select(attributes,where){
        await this.deck_tabela.sync();
        
        const select = await this.deck_tabela.findAll({
            attributes,
            where
        })

        
        return select
    }

    async update(attributet,where){
        await this.deck_tabela.sync();
        await this.deck_tabela.increment(attributet,{where})
        
 
    }
    async decre(atribute,where){
        await this.deck_tabela.sync();
        await this.deck_tabela.decrement(atribute,{where})
    }


    async delete(where){
        await this.deck_tabela.sync();
        const select = await this.deck_tabela.destroy({where})
    }


}


module.exports = new deck_tabela()
