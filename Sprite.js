class Sprite {
  constructor(config) {

    // Configuração da imagem
    this.image = new Image(); // cria uma nova instância da classe Image() do JavaScript para carregar a imagem

    this.image.src = config.src; // atribui o caminho da imagem passado como argumento para a propriedade src da imagem
    
    this.image.onload = () => { // adiciona um listener para o evento onload, que será disparado quando a imagem for carregada
      this.isLoaded = true; // define a propriedade isLoaded como true para indicar que a imagem foi carregada com sucesso
    }

    // Configuração da sombra
    this.shadow = new Image(); // cria uma nova instância da classe Image() para carregar a imagem da sombra
    this.useShadow = true; // define a propriedade useShadow como true, indicando que a sombra será usada (por padrão, mas pode ser alterado no objeto de configuração)
    if (this.useShadow) { // verifica se a sombra deve ser usada (se useShadow for true)
      this.shadow.src = "/images/characters/shadow.png"; // atribui o caminho da imagem da sombra para a propriedade src da imagem
    }
    this.shadow.onload = () => { // adiciona um listener para o evento onload, que será disparado quando a imagem da sombra for carregada
      this.isShadowLoaded = true; // define a propriedade isShadowLoaded como true para indicar que a imagem da sombra foi carregada com sucesso
    }

    // Configuração da animação e estado inicial
    this.animations = config.animations || { // define as animações a serem usadas (por padrão, uma animação de idleDown será usada)
      idleDown: [
        [0,0]
      ]
    }
    this.currentAnimation = config.currentAnimation || "idleDown"; // define a animação atual a ser usada (por padrão, a animação de idleDown será usada)
    this.currentAnimationFrame = 0; // define o frame atual da animação como zero

    // Referência para o objeto de jogo
    this.gameObject = config.gameObject; // armazena uma referência para o objeto de jogo para poder acessar as coordenadas do objeto e desenhar o sprite na posição correta
  }

  // Método para desenhar o sprite na tela
  draw(ctx) {
    const x = this.gameObject.x * 16 - 8; // calcula a posição x do sprite na tela usando as coordenadas do objeto de jogo
    const y = this.gameObject.y * 16 - 18; // calcula a posição y do sprite na tela usando as coordenadas do objeto de jogo

    // Desenha a sombra se estiver carregada
    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

    // Desenha o sprite se a imagem estiver carregada
    this.isLoaded && ctx.drawImage(this.image,
      0,0,
      32,32,
      x,y,
      32,32
    )
  }
}
