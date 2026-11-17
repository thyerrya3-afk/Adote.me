// Importa o Express, a biblioteca que cria o servidor
const express = require('express');

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

// Liga o servidor e fica "escutando" na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});