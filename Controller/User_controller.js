//Arquivo com funçao de controllar as açoes internas do sistema

module.exports.acao =  function(rota,response){
    const path = require('path')
    
    //Variavel criada para encurtar o caminho do diretorio
    const dir_html = path.join(__dirname,'..','View','html')

    //A rota é passada ao chamar a funçaõ em routers
    switch (rota) {
        
        case 'login':
            //Aqui é decidido o que sera feito caso o usuario acesse a pagina

            //Envia um arquivo html como resposta final
            response.sendFile(dir_html+'/login.html')
            
            break;
    
        default:

            break;
    }
}