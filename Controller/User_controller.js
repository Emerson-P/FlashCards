const path = require('path')
//Variavel criada para encurtar o caminho do diretorio
const dir_html = path.join(__dirname,'..','View','html')
const jwt = require('jsonwebtoken')


module.exports.cadastro = function(app,req,res){

   
    res.sendFile(dir_html+'/cadastrar.html')
}

module.exports.login = function(app,req,res){
    
    res.sendFile(dir_html+'/login.html')
}

module.exports.dadosCad = function(app,req,res){
    const tabela_user = app.Model.User_model
   
    tabela_user.insert(req.body.nome,req.body.email,req.body.senha)//Fazer verificação se funcionou


    res.redirect('/login')
    
}

module.exports.dadosLog = function(app,req,res){

    const tabela_user = app.Model.User_model

    var atribute = ['nome','email','id']
    var where = {
        'senha': req.body.senha
    }

    tabela_user.select(atribute,where)
    .then((resposta) => {
        


        if(resposta[0] == undefined){

            res.send('Acesso negado')



        }else{
            // console.log(resposta[0]['dataValues'])

            var secret = 'joaozin'

            // var valor = {
            //     'nome':resposta[0]['dataValues']['nome'],
            //     'email':resposta[0]['dataValues']['email'],
            //     'id':resposta[0]['dataValues']['id']
            // }
            
            const token = jwt.sign({userId:1},secret,{expiresIn:600})
            

            res.json(token)
            // console.log(req.headers)
            // res.sendFile(dir_html+'/decks.html')
            // res.redirect('/deck')
            
        }

    })
}

module.exports.criarDeck = function(app,req,res){
    res.send('teste')
}