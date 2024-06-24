// module.exports = (app) =>{
//     const Sequelize = require('sequelize');
//     const sequelize = new Sequelize('project_cards','root','',{
//         host:'localhost',
//         dialect:'mysql'
//     });

//     sequelize.authenticate()
//     .then(
//         mensagem => {
//             console.log('certo')
//         }
//     )
//     .catch(
//         erro =>{
//             console.log(erro)
//         }
//     )
// }
const Sequelize = require('sequelize');
    const sequelize = new Sequelize('projeto_cards','root','my3C7A8B',{
        host:'localhost',
        dialect:'mysql'
    });

    sequelize.authenticate()
    .then(
        mensagem => {
            console.log('certo')
        }
    )
    .catch(
        erro =>{
            console.log('erro')
        }
    )