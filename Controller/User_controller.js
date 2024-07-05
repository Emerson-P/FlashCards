const path = require('path')
//Variavel criada para encurtar o caminho do diretorio
const dir_html = path.join(__dirname,'..','View','html')




module.exports.cadastro = function(app,req,res){

    const banco = app.Model.User_model
    res.sendFile(dir_html+'/cadastrar.html')
}

module.exports.login = function(app,req,res){
    
    res.sendFile(dir_html+'/login.html')
}

module.exports.dadosCad = function(app,req,res){
    const tabela_user = app.Model.User_model
   
    tabela_user.insert(req.body.nome,req.body.email,req.body.senha)//Fazer verificação se funcionou


    res.sendFile(dir_html+'/login.html')
}

module.exports.dadosLog = function(app,req,res){
    const tabela_user = app.Model.User_model

   if(tabela_user.select(['id'],[10])){
    res.send('certinho pai')
   }else{
    res.send('erradinho pai')
   }
    
   
}