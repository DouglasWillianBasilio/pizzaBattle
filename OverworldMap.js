// A classe OverworldMap define um mapa para o ambiente de jogo
class OverworldMap {
    // O construtor recebe uma configuração com os objetos do jogo e as imagens do mapa
    constructor(config) {
        // Define os objetos do jogo
        this.gameObjects = config.gameObjects;

        // Carrega a imagem inferior do mapa
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        // Carrega a imagem superior do mapa
        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    // Desenha a imagem inferior do mapa no contexto de desenho especificado
    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0);
    }

    // Desenha a imagem superior do mapa no contexto de desenho especificado
    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage, 0, 0);
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
            hero: new GameObject({
                x: 5,
                y: 6,
            }),
            npc1: new GameObject({
                x: 7,
                y: 9,
                src: "/images/characters/people/npc1.png"
            })
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
