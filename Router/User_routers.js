//Arquivo responsavel por setar as rotas do site
module.exports = (app) => {
    //Chama uma funçao que dispara uma resposta dependendo da pagina que o  usuario acessar
    const control = app.Controller.User_controller.acao

    app.get('/login', (req,res) =>{
        //'login' e a acao a ser disparada, e res e usado para enviar um arquivo html como resposta
        control('login',res)
    })
}