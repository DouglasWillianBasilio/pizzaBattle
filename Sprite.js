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
      "idle-down":  [ [0,0] ],
      "idle-right": [ [0,1] ],
      "idle-up":    [ [0,2] ],
      "idle-left":  [ [0,3] ],
      "walk-down":  [ [1,0], [0,0], [3,0], [0,0] ],
      "walk-right": [ [1,1], [0,1], [3,1], [0,1] ],
      "walk-up":    [ [1,2], [0,2], [3,2], [0,2] ],
      "walk-left":  [ [1,3], [0,3], [3,3], [0,3] ]
    }
    this.currentAnimation = "walk-up"; //config.currentAnimation || "idleDown"; // define a animação atual a ser usada (por padrão, a animação de idleDown será usada)
    this.currentAnimationFrame = 0; // define o frame atual da animação como zero

    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;

    // Referência para o objeto de jogo
    this.gameObject = config.gameObject; // armazena uma referência para o objeto de jogo para poder acessar as coordenadas do objeto e desenhar o sprite na posição correta
  }

  // O método get retorna o frame atual da animação
get frame() {
  return this.animations[this.currentAnimation][this.currentAnimationFrame];
}

// O método setAnimation define a animação atual e reseta a contagem de frames
setAnimation(key) {
  // Se a animação atual já for a mesma que a animação desejada, não faz nada
  if (this.currentAnimation !== key) {
    // Define a nova animação
    this.currentAnimation = key;
    // Reseta a contagem de frames
    this.currentAnimationFrame = 0;
    // Define o progresso do frame para o limite da animação
    this.animationFrameProgress = this.animationFrameLimit;
  }
}

// O método updateAnimationsProgress avança a animação para o próximo frame, 
// levando em consideração o limite de tempo de cada frame
updateAnimationsProgress() {
  // Se ainda não passou o tempo do frame atual, apenas diminui o progresso do frame
  if (this.animationFrameProgress > 0) {
    this.animationFrameProgress -= 1;
    return;
  }

  // Se já passou o tempo do frame atual, avança para o próximo frame
  this.animationFrameProgress = this.animationFrameLimit;
  this.currentAnimationFrame += 1;

  // Se não houver mais frames na animação atual, volta para o primeiro frame
  if (this.frame === undefined) {
    this.currentAnimationFrame = 0;
  }
}


  // Método para desenhar o sprite na tela
  draw(ctx, cameraPerson) {
    const x = this.gameObject.x  - 8 + utils.withGrid(10.5) - cameraPerson.x; // calcula a posição x do sprite na tela usando as coordenadas do objeto de jogo
    const y = this.gameObject.y  - 18 + utils.withGrid(6) - cameraPerson.y; // calcula a posição y do sprite na tela usando as coordenadas do objeto de jogo

    // Desenha a sombra se estiver carregada
    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);


    const [frameX, frameY] = this.frame;

    // Desenha o sprite se a imagem estiver carregada
    this.isLoaded && ctx.drawImage(this.image,
      frameX * 32 , frameY * 32,
      32,32,
      x,y,
      32,32
    )

    this.updateAnimationsProgress();
  }

  
}
