// Importa os models que vamos usar
const { Solicitacao, Animal } = require('../models');

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