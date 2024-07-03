const express = require('express');
const app = express();
const consign = require('consign');

// Usando consign para conenctar os arquivos importantes do MVC
consign()
    .include('/Model')
    .include('/Controller/User_controller.js')
    .include('/Router/User_routers.js')
    .into(app)

//Serve arquivo estaticos para o servidor
app.use(express.static("View"));


// Adicionando localhost na porta  8081 
app.listen(8081,function() {
    console.log('servidor on em http://localhost:8081')
})