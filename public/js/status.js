// Pega todos os botões Aprovar e Recusar
const botoes = document.querySelectorAll('.btn-status');

// Para cada botão, define o que acontece ao clicar
botoes.forEach((botao) => {
  botao.addEventListener('click', async () => {
    // Lê o id da solicitação e o novo status, guardados no botão
    const id = botao.dataset.id;
    const status = botao.dataset.status;

    try {
      // Envia o pedido ao servidor, sem recarregar a página
      const resposta = await fetch('/solicitacoes/' + id + '/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: status })
      });

      // Lê a resposta em JSON
      const dados = await resposta.json();

      if (resposta.ok) {
        // Troca o texto do status na tabela
        document.getElementById('status-' + id).textContent = dados.status;
        // Remove os botões dessa linha
        document.getElementById('acoes-' + id).textContent = '';
      } else {
        // Mostra o erro que o servidor enviou
        alert(dados.mensagem);
      }
    } catch (erro) {
      // Se o servidor estiver desligado ou a sessão tiver expirado
      alert('Não foi possível atualizar. Tente entrar de novo.');
    }
  });
});