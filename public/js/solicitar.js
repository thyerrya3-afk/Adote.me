// Pega todos os botões "Quero adotar" da página
const botoes = document.querySelectorAll('.btn-solicitar');

// Para cada botão, define o que acontece quando for clicado
botoes.forEach((botao) => {
  botao.addEventListener('click', async () => {
    // Pega o id do animal guardado no botão (data-id)
    const animalId = botao.dataset.id;

    // Pega o parágrafo onde vamos mostrar a mensagem
    const mensagem = document.getElementById('msg-' + animalId);

    try {
      // Envia o pedido ao servidor, sem recarregar a página
      const resposta = await fetch('/solicitacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ animalId: animalId })
      });

      // Lê a resposta em JSON
      const dados = await resposta.json();

      // Mostra a mensagem que o servidor enviou
      mensagem.textContent = dados.mensagem;

      // Se deu certo, desativa o botão
      if (resposta.ok) {
        botao.disabled = true;
      }
    } catch (erro) {
      // Se o servidor estiver desligado ou a sessão tiver expirado
      mensagem.textContent = 'Não foi possível enviar. Tente entrar de novo.';
    }
  });
});