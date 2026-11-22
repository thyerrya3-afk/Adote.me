// Importa os models que vamos usar
const { Solicitacao, Animal, Usuario } = require('../models');

// Lista as solicitações (adotante vê as suas; administrador vê todas)
exports.listar = async (req, res) => {
  try {
    // Começa sem filtro (administrador vê tudo)
    const filtro = {};

    // Se for adotante, mostra só as solicitações dele (o id vem da sessão)
    if (req.session.usuario.tipo === 'adotante') {
      filtro.UsuarioId = req.session.usuario.id;
    }

    // Busca as solicitações junto com o animal e o usuário de cada uma
    const solicitacoes = await Solicitacao.findAll({
      where: filtro,
      include: [Animal, Usuario],
      order: [['createdAt', 'DESC']]   // mais recentes primeiro
    });

    res.render('solicitacoes/index', { solicitacoes });
  } catch (erro) {
    res.status(500).send('Erro ao buscar as solicitações.');
  }
};

// Cria uma solicitação de adoção (responde em JSON, para o fetch)
exports.criar = async (req, res) => {
  try {
    // Só adotantes podem solicitar
    if (req.session.usuario.tipo !== 'adotante') {
      return res.status(403).json({ mensagem: 'Apenas adotantes podem solicitar adoção.' });
    }

    // O id do animal vem do fetch
    const { animalId } = req.body;

    // Confere se o animal existe
    const animal = await Animal.findByPk(animalId);
    if (!animal) {
      return res.status(404).json({ mensagem: 'Animal não encontrado.' });
    }

    // Confere se o animal ainda está disponível
    if (animal.situacao !== 'disponivel') {
      return res.status(400).json({ mensagem: 'Este animal não está mais disponível.' });
    }

    // O id do usuário vem da SESSÃO, e não do que o navegador enviou
    const usuarioId = req.session.usuario.id;

    // Evita solicitar o mesmo animal duas vezes
    const existente = await Solicitacao.findOne({
      where: { UsuarioId: usuarioId, AnimalId: animal.id }
    });
    if (existente) {
      return res.status(409).json({ mensagem: 'Você já enviou uma solicitação para este animal.' });
    }

    // Salva a solicitação (o status começa como "pendente")
    await Solicitacao.create({ UsuarioId: usuarioId, AnimalId: animal.id });

    res.status(201).json({ mensagem: 'Solicitação enviada com sucesso!' });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao enviar a solicitação.' });
  }
};

// Atualiza o status de uma solicitação (só o administrador, via fetch)
exports.atualizarStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Só aceita estes dois valores (evita receber qualquer coisa)
    if (status !== 'aprovada' && status !== 'recusada') {
      return res.status(400).json({ mensagem: 'Status inválido.' });
    }

    // Busca a solicitação pelo id que veio na URL
    const solicitacao = await Solicitacao.findByPk(req.params.id);
    if (!solicitacao) {
      return res.status(404).json({ mensagem: 'Solicitação não encontrada.' });
    }

    // Atualiza o status no banco
    await solicitacao.update({ status });

    // Se foi aprovada, o animal passa a ficar "adotado"
    if (status === 'aprovada') {
      await Animal.update(
        { situacao: 'adotado' },
        { where: { id: solicitacao.AnimalId } }
      );
    }

    res.json({ mensagem: 'Status atualizado!', status });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar o status.' });
  }
};