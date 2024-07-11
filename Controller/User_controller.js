const path = require('path')
//Variavel criada para encurtar o caminho do diretorio
const dir_html = path.join(__dirname,'..','View','html')
const jwt = require('jsonwebtoken')


module.exports.cadastro = function(app,req,res){

   
    res.render(dir_html+'/cadastrar')
}

module.exports.login = function(app,req,res){
    
    res.render(dir_html+'/login')
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
            

            var secret = 'joaozin'

            var valor = {
                'nome':resposta[0]['dataValues']['nome'],
                'email':resposta[0]['dataValues']['email'],
                'id':resposta[0]['dataValues']['id']
            }
            
            const token = jwt.sign(valor,secret,{expiresIn:600})
            

            res.cookie('auth',token, { httpOnly: true, secure: true })
            
            res.redirect('/deck')
    
        }

    })
}

module.exports.deck = function(app,req,res){
    
    const data = [1,2,3,4]
    res.render('../View/html/decks', {data})
}

module.exports.criarDeck = function(app,req,res){

    

    const tabela_decks = app.Model.Decks_model

    tabela_decks.insert(req.body.nome,req.userID)
    res.redirect('/deck')
}