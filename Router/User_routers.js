module.exports = function(app){

    app.get('/cadastrar',function(req,res){
        app.Controller.User_controller.cadastro(app,req,res)
    })
    app.get('/login',function(req,res){
        app.Controller.User_controller.login(app,req,res)
    })
    app.post('/dadosCadastro',function(req,res){
        app.Controller.User_controller.dadosCad(app,req,res)
    })
    app.post('/dadosLogin',function(req,res){
        app.Controller.User_controller.dadosLog(app,req,res)
    })

}