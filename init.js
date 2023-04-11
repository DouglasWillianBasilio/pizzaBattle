(function () {
  // Criação de um novo objeto Overworld com um objeto de configuração
  const overworld = new Overworld({
    element: document.querySelector(".game-container")
  });

  // Inicialização do Overworld
  overworld.init();

})();