// Importa os três models
const Usuario = require('./Usuario');
const Animal = require('./Animal');
const Solicitacao = require('./Solicitacao');

// Relacionamento 1:N entre Usuario e Solicitacao
// Um usuário pode fazer várias solicitações
Usuario.hasMany(Solicitacao);
// Cada solicitação pertence a um único usuário
Solicitacao.belongsTo(Usuario);

// Relacionamento 1:N entre Animal e Solicitacao
// Um animal pode receber várias solicitações
Animal.hasMany(Solicitacao);
// Cada solicitação é de um único animal
Solicitacao.belongsTo(Animal);

// Exporta os três models juntos
module.exports = { Usuario, Animal, Solicitacao };