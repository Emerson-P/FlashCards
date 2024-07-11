const Sequelize = require('sequelize');
const db = require('../db');



class deck_tabela {
    constructor(){
        //Definção da tabela acessada
        this.deck_tabela = db.define('deck',{
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
            },
            tags:{
                type:Sequelize.TEXT
            }
        });
    }

    async insert(nome,id_users){
        await this.deck_tabela.sync();

        await this.deck_tabela.create({
            nome,
            id_users
        })

    }

    // async select(attributes,where){
    //     await this.deck_tabela.sync();
        
    //     const select = await this.user_tabela.findAll({
    //         attributes,
    //         where
    //     })

        
    //     return select
    // }

    // async update(attributet,where){
    //     await this.user_tabela.sync();
        
    //     const select = await this.user_tabela.update(attributet,{where})

 
    // }

    // async delete(where){
    //     await this.user_tabela.sync();
        
    //     const select = await this.user_tabela.destroy({where})

 
    // }


}


module.exports = new deck_tabela()
