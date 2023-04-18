// A classe Overworld define um ambiente de jogo com um canvas e um contexto de desenho
class Overworld {
  // O construtor recebe uma configuração que contém uma referência ao elemento HTML que contém o jogo
  constructor(config) {
    // Define a referência ao elemento HTML que contém o jogo
    this.element = config.element;

    // Configuração do objeto Overworld: define o canvas e o contexto de desenho
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null; // Ainda não há um mapa definido para o ambiente de jogo
  }

  // Inicia o loop do jogo
  startGameLoop() {
    // A função "step" é chamada a cada frame do jogo
    const step = () => {
      // Limpa o canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Desenha a imagem inferior do mapa
      this.map.drawLowerImage(this.ctx);

      // Atualiza a posição dos objetos do jogo e desenha seus sprites
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction
        })
        object.sprite.draw(this.ctx);
      });

      // Desenha a imagem superior do mapa
      this.map.drawUpperImage(this.ctx);

      // Chama novamente a função "step" para o próximo frame
      requestAnimationFrame(() => {
        step();
      });
    };
    // Chama a função "step" pela primeira vez
    step();
  }

  // Inicializa o ambiente de jogo
  init() {
    // Define um mapa para o ambiente de jogo
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    // Inicia o loop do jogo
    this.startGameLoop();
  }
}
