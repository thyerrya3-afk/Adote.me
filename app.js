// Lê o arquivo .env (precisa ser a primeira linha)
require('dotenv').config();

// Importa o Express, a biblioteca que cria o servidor
const express = require('express');

// Importa a conexão com o banco
const sequelize = require('./config/database');

// Cria a aplicação. Todo o projeto vai se apoiar neste "app"
const app = express();

// Define a porta onde o servidor vai rodar
const PORT = 3000;

// Diz ao Express que as páginas serão feitas com EJS
app.set('view engine', 'ejs');

// Permite ler dados enviados por formulários HTML (cadastro, login)
app.use(express.urlencoded({ extended: true }));

// Permite ler dados enviados em formato JSON (vamos usar no AJAX/Fetch)
app.use(express.json());

// Libera a pasta "public" para o navegador (CSS, JS, imagens)
app.use(express.static('public'));

// Rota da página inicial: mostra o arquivo views/index.ejs
app.get('/', (req, res) => {
  res.render('index');
});

// Testa a conexão com o banco e, se der certo, liga o servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((erro) => {
    console.log('Erro ao conectar no banco:', erro.message);
  });