const Sequelize = require('sequelize');
const db = require('../db');



class card_tabela {
    constructor(){
        //Definção da tabela acessada
        this.card_tabela = db.define('cards',{
            id:{
                type:Sequelize.INTEGER,
                autoIncrement:true,
                allowNull:false,
                primaryKey:true
            },
            
            titulo:{
                type:Sequelize.TEXT,
                allowNull:false,
            },
            desc:{
                type:Sequelize.TEXT,
                allowNull:false,
            },
            id_deck:{
                type:Sequelize.INTEGER,
                allowNull:false,
                foreignkey:true
            }
        });
    }

    async insert(titulo,desc,id_deck){
        await this.card_tabela.sync();

        await this.card_tabela.create({
            titulo,
            desc,
            id_deck
        })

    }

    async select(attributes,where){
        await this.card_tabela.sync();
        
        const select = await this.card_tabela.findAll({
            attributes,
            where
        })

        
        return select
    }

    async update(attributet,where){
        await this.card_tabela.sync();
        await this.card_tabela.increment(attributet,{ where})
    }

    async delete(where){
        await this.card_tabela.sync();
        
        const select = await this.card_tabela.destroy({where})
        
        
    }


}


module.exports = new card_tabela()
