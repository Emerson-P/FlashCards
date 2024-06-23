module.exports.acao = function(rota,response){

    switch (rota) {
        case 'login':
            response.send('sera que funcionou ')
            
            break;
    
        default:
            break;
    }
}