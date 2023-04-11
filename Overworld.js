class Overworld {
 constructor(config) {
   this.element = config.elemen
   // Configuração do objeto Overworld;
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
 }

 init() {
  // Carregando a imagem do mapa
   const image = new Image();
   image.onload = () => {
     this.ctx.drawImage(image,0,0)
   };
   image.src = "/images/maps/DemoLower.png";


  // Definindo as coordenadas do personagem e sombra
   const x = 5;
   const y = 6;

   // Carregando a imagem da sombra
   const shadow = new Image();
   shadow.onload = () => {
    this.ctx.drawImage(
      shadow, 
      0, // Posição do corte à esquerda 
      0, // Posição do corte superior
      32, // Largura do corte
      32, // Altura do corte
      x * 16 - 8, // Posição x da sombra
      y * 16 - 18, // Posição y da sombra
      32, // Largura da imagem
      32 // Altura da imagem
   )
   }
   shadow.src = "/images/characters/shadow.png";

   // Carregando a imagem do personagem
   const hero = new Image();
   hero.onload = () => {
     this.ctx.drawImage(
       hero, 
       ow, 
      0, // Posição do corte à esquerda 
      0, // Posição do corte superior
      32, // Largura do corte
      32, // Altura do corte
      x * 16 - 8, // Posição x da sombra
      y * 16 - 18, // Posição y da sombra
      32, // Largura da imagem
      32 // Altura da imagem
    )
   }
   hero.src = "/images/characters/people/hero.png";


 }

}