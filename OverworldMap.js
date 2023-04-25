// A classe OverworldMap define um mapa para o ambiente de jogo
class OverworldMap {
    // O construtor recebe uma configuração com os objetos do jogo e as imagens do mapa
    constructor(config) {
        // Define os objetos do jogo
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        // Carrega a imagem inferior do mapa
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        // Carrega a imagem superior do mapa
        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    // Desenha a imagem inferior do mapa no contexto de desenho especificado
    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage,
             utils.withGrid(10.5) - cameraPerson.x,
             utils.withGrid(6)- cameraPerson.y);
    }

    // Desenha a imagem superior do mapa no contexto de desenho especificado
    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage,
             utils.withGrid(10.5) - cameraPerson.x,
             utils.withGrid(6) - cameraPerson.y
        )
    }

    isSpaceTaken(currentX, currentY, direction) { // Declaração do método "isSpaceTaken" que recebe as coordenadas "currentX" e "currentY" e a direção do movimento como parâmetros
        const {x,y} = utils.nextPosition(currentX, currentY, direction); // Chama o método "nextPosition" do objeto "utils" passando as coordenadas e a direção como argumentos, e atribui o resultado às variáveis "x" e "y"
        return this.walls[`${x}, ${y}`] || false; // Verifica se há uma parede na posição indicada pelas coordenadas "x" e "y" no objeto "walls". Retorna "true" se houver uma parede ou "false" caso contrário.
      }
      
      mountObjects() { // Declaração do método "mountObjects"
        Object.values(this.gameObjects).forEach(o => { // Percorre todos os objetos no objeto "gameObjects"
          o.mount(this); // Chama o método "mount" de cada objeto, passando o objeto atual como argumento
        })
      }
      
      addWall(x,y) { // Declaração do método "addWall" que recebe as coordenadas "x" e "y" como parâmetros
        this.walls[`${x}, ${y}`] = true; // Adiciona uma parede na posição indicada pelas coordenadas "x" e "y" no objeto "walls"
      }
      
      removeWall(x,y) { // Declaração do método "removeWall" que recebe as coordenadas "x" e "y" como parâmetros
        delete this.walls[`${x}, ${y}`]; // Remove a parede na posição indicada pelas coordenadas "x" e "y" do objeto "walls"
      }
      
      moveWall(wasX, wasY, direction) { // Declaração do método "moveWall" que recebe as coordenadas anteriores "wasX" e "wasY" e a direção do movimento como parâmetros
        this.removeWall(wasX, wasY); // Remove a parede na posição anterior indicada pelas coordenadas "wasX" e "wasY"
        const {x,y} = utils.nextPosition(wasX, wasY, direction); // Chama o método "nextPosition" do objeto "utils" passando as coordenadas anteriores e a direção como argumentos, e atribui o resultado às variáveis "x" e "y"
        this.addWall(x,y); // Adiciona uma parede na nova posição indicada pelas coordenadas "x" e "y"
      }
      
}

// Define os mapas disponíveis para o ambiente de jogo
window.OverworldMaps = {
    DemoRoom: {
        // Define a imagem inferior do mapa da Demo Room
        lowerSrc: "/images/maps/DemoLower.png",
        // Define a imagem superior do mapa da Demo Room
        upperSrc: "/images/maps/DemoUpper.png",
        // Define os objetos do jogo na Demo Room
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
            }),
            npc1: new Person({
                x: utils.withGrid (7),
                y: utils.withGrid (9),
                src: "/images/characters/people/npc1.png"
            })
        },
        walls: {
            [utils.asGridCoord(7,6)] : true,
            [utils.asGridCoord(8,6)] : true,
            [utils.asGridCoord(7,7)] : true,
            [utils.asGridCoord(8,7)] : true,
        }
    },
    Kitchen: {
        // Define a imagem inferior do mapa da cozinha
        lowerSrc: "/images/maps/KitchenLower.png",
        // Define a imagem superior do mapa da cozinha
        upperSrc: "/images/maps/KitchenUpper.png",
        // Define os objetos do jogo na cozinha
        gameObjects: {
            hero: new GameObject({
                x: 3,
                y: 5,
            }),
            npcA: new GameObject({
                x: 9,
                y: 6,
                src: "/images/characters/people/npc2.png"
            }),
            npcB: new GameObject({
                x: 10,
                y: 8,
                src: "/images/characters/people/npc3.png"
            })
        }
    }
};
