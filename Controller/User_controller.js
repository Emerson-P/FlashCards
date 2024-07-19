const path = require('path')
//Variavel criada para encurtar o caminho do diretorio
const dir_html = path.join(__dirname,'..','View','html')
const jwt = require('jsonwebtoken')
const { or } = require('sequelize')
const { Module } = require('module')


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
            
            const token = jwt.sign(valor,secret,{expiresIn:2400})
            

            res.cookie('auth',token, { httpOnly: true, secure: true })
            
            res.redirect('/decks')
    
        }

    })
}

module.exports.decks = function(app,req,res){
//    const data = [1,2,3]
    // res.render('../View/html/decks', {data})

    const tabela_decks = app.Model.Decks_model

    
    var atribute = ['id','nome','num_cards']
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
    const tabela_tags = app.Model.tags_model

  
   

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

    const decks = app.Model.Decks_model
    const id = req.url.replace('/criarCard?id=','')
    const cards = app.Model.Cards_model

    cards.insert(req.body.titulo,req.body.desc,id)
    let atribute = {
        num_cards:1
    } 
    let where = {
        id:id
    }
    decks.update(atribute,where)

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

    res.redirect('/cardIA?id='+id)
}
module.exports.Del = function (app,req,res) {
    const id_card = req.body['id_card']
    const id_deck = req.url.replace('/Del?id=','')

    const cards = app.Model.Cards_model
    const deck = app.Model.Decks_model
    var where = {
        id:id_card,
        id_deck
    } 

    
    cards.delete(where)

    where = {
        id:id_deck
    }
    let atribute = {
        num_cards:1
    }
    deck.decre(atribute,where)

    res.json({mensagem:'cero'})

}
module.exports.DelDeck = function (app,req,res) {
    const id_deck = req.body['id_deck']
    const deck = app.Model.Decks_model

    var where = {
        id:id_deck
    } 

    
    deck.delete(where)

   
    res.json({mensagem:'cero'})
    
}
module.exports.altCard = function (app,req,res) {
    const cards = app.Model.Cards_model

    var list = req.url.split('&')

    var id_deck = list[0].replace('/alterarCard?id_deck=','')
    var id =  list[1].replace('id_card=','')
    
    var atribute = {
        titulo:req.body.titulo,
        desc:req.body.desc
    }
    var where = {
        id
    }
    cards.alterarCard(atribute,where)

    var url_complete = '/deck?id='+id_deck
    res.redirect(url_complete)
}
module.exports.estudar = function(app,req,res){
    const id_deck = req.url.replace('/estudar?id=','')
    const cards = app.Model.Cards_model

    const atribute = ['titulo','desc','id']

    const where = {
        id_deck
    }

    cards.select(atribute,where).then((resposta) => {
        
        var lista = []

        resposta.forEach(element => {

            var card = [element['dataValues']['titulo'],element['dataValues']['desc'],element['dataValues']['id']]
            lista.push(card)
        });
        
        const data = {
        id: id_deck,
        lista
        }

        
        res.render(dir_html+`/estudar`, {data})

    })
}