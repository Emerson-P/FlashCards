module.exports = (app) => {
    const control = app.Controller.User_controller.acao

    app.get('/login', (req,res) =>{
        control('login',res)
    })
}