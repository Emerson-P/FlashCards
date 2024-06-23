const express = require('express');
const app = express();


const consign = require('consign');

var teste = 'isso funciona ?'
consign()
    .include('/Model')
    .include('/Controller/User_controller.js')
    .include('/Router/User_routers.js')
    .into(app)


app.use(express.static("View"));



app.listen(8081,function() {
    console.log('servidor on em http://localhost:8081')
})