class Overworld {
  constructor(config) {
    // Define a referência ao elemento HTML que contém o jogo
    this.element = config.element;

    // Configuração do objeto Overworld: define o canvas e o contexto de desenho
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  init() {
    // Carregando a imagem do mapa e desenhando-a no canvas
    const image = new Image();
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0);
    };
    image.src = "/images/maps/DemoLower.png";

    // Criação de objetos de jogo: herói e NPC
    const hero = new GameObject({
      x: 5,
      y: 6,
    });
    const npc1 = new GameObject({
      x: 7,
      y: 9,
      src: "/images/characters/people/npc1.png",
    });

    // Desenha os sprites dos objetos de jogo após um atraso de 200ms (para garantir que a imagem do sprite tenha carregado)
    setTimeout(() => {
      hero.sprite.draw(this.ctx);
      npc1.sprite.draw(this.ctx);
    }, 200);
  }
}
