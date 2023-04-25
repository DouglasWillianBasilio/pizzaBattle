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
            "up":     ["y", -1],
            "down":   ["y", 1],
            "left":   ["x", -1],
            "right":  ["x", 1],
        }
    }

    // Método update que atualiza o estado do personagem
    update(state) {
        if(this.movingProgressRemaning > 0) {
            // Atualiza a posição do personagem
            this.updatePosition();
        }else {
            if(this.isPlayerControlled && state.arrow){
                this.startBehavior(state,{
                 type: "walk",
                 direction: state.arrow
                })
             }
             this.updateSprite(state);
        }
    }

    startBehavior(state, behavior) {
        this.direction = behavior.direction;
        if (behavior.type === "walk") {
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)){
                return;
            }

            state.map.moveWall(this.x, this.y, this.direction);
            this.movingProgressRemaning = 16;
        }
    }

    // Método que atualiza a posição do personagem com base na direção atual e na tabela de atualização de direção
    updatePosition() {
        
            // Obtém a propriedade do objeto (x ou y) e a variação de valor associada à direção atual
            const [property, change] = this.directionUpdate[this.direction]
            // Atualiza a propriedade correspondente com a variação de valor
            this[property] += change;
            // Decrementa o tempo de movimento restante
            this.movingProgressRemaning -= 1;
        }

    // Método que atualiza a animação do sprite do personagem com base na direção atual e no estado do movimento
    updateSprite() {
        // Verifica se o personagem está em movimento
        if(this.movingProgressRemaning > 0) {
            // Define a animação "walk" correspondente à direção atual
            this.sprite.setAnimation("walk-" + this.direction);
            return;
        }
        this.sprite.setAnimation("idle-"+this.direction);
    }
}
