// Importa as ferramentas de teste que já vêm no Node.js
const test = require('node:test');
const assert = require('node:assert');

// Importa os middlewares que vamos testar
const { estaLogado, ehAdmin } = require('../middlewares/auth');

// Cria uma resposta "de mentira" (res) que anota o que o middleware fez
function criarRes() {
  const res = {};
  res.redirect = (url) => { res.redirecionouPara = url; };
  res.status = (codigo) => { res.codigo = codigo; return res; };
  res.send = (texto) => { res.texto = texto; };
  return res;
}

// TESTE 1: quem não está logado é mandado para o login
test('estaLogado manda para /login quem não está logado', () => {
  const req = { session: {} };        // sessão vazia: ninguém logado
  const res = criarRes();
  let passou = false;

  estaLogado(req, res, () => { passou = true; });

  assert.strictEqual(res.redirecionouPara, '/login');
  assert.strictEqual(passou, false);  // não pode seguir para a rota
});

// TESTE 2: um adotante é bloqueado nas rotas de administrador
test('ehAdmin bloqueia adotante com erro 403', () => {
  const req = { session: { usuario: { tipo: 'adotante' } } };
  const res = criarRes();
  let passou = false;

  ehAdmin(req, res, () => { passou = true; });

  assert.strictEqual(res.codigo, 403);
  assert.strictEqual(passou, false);  // não pode seguir para a rota
});