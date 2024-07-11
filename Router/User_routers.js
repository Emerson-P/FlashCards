module.exports = function(app){

    const jwt = require('jsonwebtoken')
    const secret = 'joaozin'


    function verifyJWT(req,res,next){

        const token = req.cookies.auth

        try{
            const decoded = jwt.verify(token,secret);
            req.userID = decoded.id
        }
        catch(err){
            res.status(403).send('Token inválido')
        }
        next();
    }

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

    app.get('/deck',verifyJWT,function(req,res){
        
        app.Controller.User_controller.deck(app,req,res)
    })
    
    app.post('/criarDeck',verifyJWT,function(req,res){

        
        app.Controller.User_controller.criarDeck(app,req,res)
    })
}