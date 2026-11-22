// Importa o express-rate-limit
const rateLimit = require('express-rate-limit');

// Limita as tentativas de login: no máximo 10 a cada 15 minutos por pessoa
const limiteLogin = rateLimit({
  windowMs: 15 * 60 * 1000,   // período de 15 minutos (em milissegundos)
  limit: 10,                  // máximo de 10 tentativas nesse período

  // O que fazer quando o limite for ultrapassado
  handler: (req, res) => {
    res.status(429).render('auth/login', {
      erro: 'Muitas tentativas de login. Aguarde 15 minutos e tente de novo.'
    });
  }
});

module.exports = limiteLogin;