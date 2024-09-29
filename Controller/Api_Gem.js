//Arquivo responsavel por utilizar a api do gemini
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { text } = require("body-parser");



// const genAI = new GoogleGenerativeAI(process.env.api_key);

// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// async function run() {
//     const prompt = "De alguns motivos de porque o gemini e superior ao chatgpt"
  
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);
//   }
  
//   // run();

class IA{
  constructor(){
    const genAI = new GoogleGenerativeAI(process.env.api_key);
    this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  }

  async gerarCards(numero,tema,linguagem) {

    const prompt = `Gere ${numero} flashcards com o tema ' ${tema} ' com linguagem ${linguagem},Siga  o formato   titulo: 'titulo', Descriçao: 'descrição' use $ para inicio e fim de cada card, não utilize nehnhum tipo de aspas `
    
    console.log(prompt)
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    


    return text
  }
}

module.exports = new IA();