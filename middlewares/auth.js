// Só deixa passar quem está logado
exports.estaLogado = (req, res, next) => {
  if (req.session.usuario) {
    return next();            // está logado: segue para a rota
  }
  res.redirect('/login');     // não está logado: vai para o login
};

// Só deixa passar quem é administrador
exports.ehAdmin = (req, res, next) => {
  // Primeiro: precisa estar logado
  if (!req.session.usuario) {
    return res.redirect('/login');
  }

  // Segundo: precisa ser administrador
  if (req.session.usuario.tipo !== 'administrador') {
    return res.status(403).send('Acesso negado: apenas administradores.');
  }

  next();                     // é administrador: segue para a rota
};