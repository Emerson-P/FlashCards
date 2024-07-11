module.exports = function(app){

    const jwt = require('jsonwebtoken')

    const secret = 'joaozin'


    function verifyJWT(req,res,next){
        const token = req.headers['x-acess-token']
        jwt.verify(token,secret,(err,decoded) => {
            // if(err) return res.status(401).end();
            if(err){
                console.log('errro')
                res.end()}

            req.userId = decoded.userId;
            next();
        })
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

    
    app.get('/criarDeck',verifyJWT,function(req,res){

        console.log(req.userId + 'ahhhhhhhhhhhh')
        app.Controller.User_controller.criarDeck(app,req,res)
    })
}