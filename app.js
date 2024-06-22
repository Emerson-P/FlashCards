const express = require('express');
const app = express();

const consign = require('consign');

consign()
    .include('/Model')
    .include('/Controller')
    .into(app)





app.use(express.static("View"));

app.listen(8081,function() {
    console.log('servidor on em http://localhost:8081')
})