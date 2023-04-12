class GameObject {
    constructor(config) {
      // Define as coordenadas iniciais do objeto (por padrão, x=0 e y=0)
      this.x = config.x || 0;
      this.y = config.y || 0;
  
      // Cria um novo sprite para o objeto usando as configurações passadas no objeto de configuração
      this.sprite = new Sprite({
        gameObject: this, // passa uma referência para o objeto atual para que o sprite possa acessar suas coordenadas e desenhá-lo corretamente na tela
        src: config.src || "/images/characters/people/hero.png", // define o caminho da imagem a ser usada para o sprite (por padrão, a imagem do herói será usada)
      });
    }
  }
  