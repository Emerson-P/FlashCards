const path = require('path')
//Variavel criada para encurtar o caminho do diretorio
const dir_html = path.join(__dirname,'..','View','html')
const jwt = require('jsonwebtoken')
const { or } = require('sequelize')


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
            
            const token = jwt.sign(valor,secret,{expiresIn:1200})
            

            res.cookie('auth',token, { httpOnly: true, secure: true })
            
            res.redirect('/decks')
    
        }

    })
}

module.exports.decks = function(app,req,res){
//    const data = [1,2,3]
    // res.render('../View/html/decks', {data})

    const tabela_decks = app.Model.Decks_model

    
    var atribute = ['id','nome','num_cards','tags']
    var where = {
        id_user:req.userID
    }

    tabela_decks.select(atribute,where).then((resposta) => {
        
        var data = []

        resposta.forEach(element => {

            var deck = [element['dataValues']['nome'],element['dataValues']['num_cards'],
            element['dataValues']['id']]
            data.push(deck)
        });
        
        res.render(dir_html+'/decks', {data})
    
    })
    
}

module.exports.criarDeck = function(app,req,res){

    

    const tabela_decks = app.Model.Decks_model

    tabela_decks.insert(req.body.nome,req.userID)

    res.redirect('/decks')
}
module.exports.deck = function(app,req,res){
    const cards = app.Model.Cards_model
    const id = req.url.replace('/deck?id=','')

    const atribute = ['titulo','desc','id']

    const where = {
        id_deck:id
    }

    cards.select(atribute,where).then((resposta) => {
        
        var lista = []

        resposta.forEach(element => {

            var card = [element['dataValues']['titulo'],element['dataValues']['desc'],
            element['dataValues']['id']]
            lista.push(card)
        });
        
        const data = {
        id: id,
        lista
        }
        res.render(dir_html+'/deck', {data})
    })
    
}
module.exports.criarCard = function(app,req,res){

    const id = req.url.replace('/criarCard?id=','')
    const cards = app.Model.Cards_model

    cards.insert(req.body.titulo,req.body.desc,id)
    
    var url_complete = '/deck?id='+id
    res.redirect(url_complete)
    
}

module.exports.cardIA = function(app,req,res){
    const id = req.url.replace('/cardIA?id=','')
    const data = {
        id: id
        }
   res.render(dir_html+'/cardsIa',{data})
}

module.exports.gerarIA = function(app,req,res){
    const ia = app.Controller.Api_Gem

    ia.gerarCards(req.body.num_cards, req.body.tema, req.body.linguagem).then((resposta) => {
        console.log(resposta)
        var array = resposta.split('$')

        const cards = []
        array.forEach((element) =>{
            if(element.includes('Título') || element.includes('Descrição')){
                var card = element.replaceAll('**','')
                card = card.replaceAll('\n','')
                card = card.replaceAll('Título','')
                card = card.replaceAll(':','')
                cards.push(card.split("Descrição"))
                
            }
        })
        const id = req.url.replace('/gerarIA?id=','')
        const data = {
            id: id,
            cards:cards
            }
        res.render(dir_html+'/selCard', {data})
    })
}

module.exports.addCardIa = function (app,req,res) {
    const id = req.url.replace('/addCardIa?id=','')

    const decks = app.Model.Decks_model
    const cards = app.Model.Cards_model

    let index = 1
    while (index<8) {
        
        let titulo = `titulo${index}`
        let dec = `desc${index}`
        if(req.body[titulo] && req.body[dec] ){
            cards.insert(req.body[titulo],req.body[dec],id)
            var updt = index
        }
        index +=1
    }
    if (updt >0) {
        let atribute = {
            num_cards:updt
        } 
        let where = {
            id:id
        }
        decks.update(atribute,where)
    }

    res.send('teste')
}
