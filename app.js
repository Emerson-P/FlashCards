const express = require('express');
const app = express();
const consign = require('consign');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(cookieParser());
app.set('view engine','ejs');
// Usando consign para conenctar os arquivos importantes do MVC

consign()
    .include('/Controller') 
    .include('/Model')
    .include('/Router')
   
    .into(app)


//Serve arquivo estaticos para o servidor
app.use(express.static("View"));


// Adicionando localhost na porta  8081 
app.listen(8081,function() {
    console.log('servidor on em http://localhost:8081')
})