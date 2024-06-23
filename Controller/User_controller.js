module.exports.acao =  function(rota,response){
    const path = require('path')
    

    const dir_html = path.join(__dirname,'..','View','html')
    switch (rota) {
        case 'login':
            response.sendFile(dir_html+'/login.html')
            
            break;
    
        default:

            break;
    }
}