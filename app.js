// Lê o arquivo .env (precisa ser a primeira linha)
require('dotenv').config();

// Importa o Express, a biblioteca que cria o servidor
const express = require('express');

// Importa o módulo de sessão
const session = require('express-session');

// Importa a conexão com o banco
const sequelize = require('./config/database');

// Importa os models (isso registra as tabelas e os relacionamentos)
require('./models');

// Importa as rotas
const animalRoutes = require('./routes/animalRoutes');
const authRoutes = require('./routes/authRoutes');

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

// Configura a sessão (guarda quem está logado)
app.use(session({
  secret: process.env.SESSION_SECRET, // chave secreta que vem do .env
  resave: false,                      // não regrava a sessão se nada mudou
  saveUninitialized: false,           // não cria sessão para quem não logou
  cookie: {
    httpOnly: true,                   // o JavaScript do navegador não lê o cookie
    maxAge: 1000 * 60 * 60            // a sessão dura 1 hora
  }
}));

// Rota da página inicial: mostra o arquivo views/index.ejs
app.get('/', (req, res) => {
  res.render('index');
});

// Rotas de cadastro e login (/cadastro, /login...)
app.use('/', authRoutes);

// Todas as rotas de animais ficam sob o endereço /animais
app.use('/animais', animalRoutes);

// Cria as tabelas no banco (se ainda não existirem) e liga o servidor
sequelize.sync()
  .then(() => {
    console.log('Tabelas sincronizadas com o banco de dados!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((erro) => {
    console.log('Erro ao conectar no banco:', erro.message);
  });