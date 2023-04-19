// Classe Person que herda de GameObject
class Person extends GameObject {
    // Construtor da classe Person que recebe um objeto config como parâmetro
    constructor(config) {
        // Chama o construtor da classe pai (GameObject) passando o objeto config como parâmetro
        super(config);
        
        // Inicializa uma variável de controle de movimento com valor zero
        this.movingProgressRemaning = 0;

        // Define se o personagem é controlado pelo jogador ou não (padrão é false)
        this.isPlayerControlled = config.isPlayerControlled || false;

        // Define uma tabela de atualização de direção, que associa cada direção (up, down, left, right) a uma propriedade do objeto (x ou y) e uma variação de valor (-1 ou 1)
        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    // Método update que atualiza o estado do personagem
    update(state) {
        // Atualiza a posição do personagem
        this.updatePosition();
        this.updateSprite(state);

        // Verifica se o personagem é controlado pelo jogador, se há uma seta pressionada e se o personagem não está em movimento
        if(this.isPlayerControlled && this.movingProgressRemaning === 0 && state.arrow){
            // Define a direção do personagem com base na seta pressionada
            this.direction = state.arrow;
            // Inicia o movimento com uma duração de 16 frames
            this.movingProgressRemaning = 16
        }
    }

    // Método que atualiza a posição do personagem com base na direção atual e na tabela de atualização de direção
    updatePosition() {
        // Verifica se o personagem está em movimento
        if(this.movingProgressRemaning > 0) {
            // Obtém a propriedade do objeto (x ou y) e a variação de valor associada à direção atual
            const [property, change] = this.directionUpdate[this.direction]
            // Atualiza a propriedade correspondente com a variação de valor
            this[property] += change;
            // Decrementa o tempo de movimento restante
            this.movingProgressRemaning -= 1;
        }
    }

    updateSprite(state) {
        if(this.isPlayerControlled && this.movingProgressRemaning === 0 && !state.arrow) {
            this.sprite.setAnimation("idle-" + this.direction);
            return;
        }
        

        if(this.movingProgressRemaning > 0) {
            this.sprite.setAnimation("walk-" + this.direction);
        }
    }
}
