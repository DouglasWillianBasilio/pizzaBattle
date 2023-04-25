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

    
    update(state) { // Declaração do método "update" que recebe o estado atual "state" como parâmetro
        if (this.movingProgressRemaning > 0) { // Verifica se o personagem está em movimento, ou seja, se a quantidade de movimento restante é maior que 0
          this.updatePosition(); // Atualiza a posição do personagem
        } else { // Caso contrário, o personagem não está em movimento
          if (this.isPlayerControlled && state.arrow) { // Verifica se o personagem é controlado pelo jogador e se há uma seta pressionada no estado atual
            this.startBehavior(state, { // Inicia um comportamento de caminhada com a direção indicada pela seta pressionada
              type: "walk",
              direction: state.arrow
            });
          }
          this.updateSprite(state); // Atualiza o sprite do personagem com o estado atual
        }
      }
      

    startBehavior(state, behavior) { // Declaração do método "startBehavior" que recebe o estado atual "state" e um comportamento "behavior" como parâmetros
        this.direction = behavior.direction; // Atribui a direção indicada pelo comportamento à propriedade "direction" do objeto atual
        if (behavior.type === "walk") { // Verifica se o comportamento é do tipo "walk"
          if (state.map.isSpaceTaken(this.x, this.y, this.direction)){ // Verifica se há uma parede na posição para onde o objeto está tentando se mover, usando o método "isSpaceTaken" do objeto "map". Se houver, retorna
            return;
          }
          state.map.moveWall(this.x, this.y, this.direction); // Remove a parede da posição anterior e adiciona uma nova parede na nova posição para onde o objeto está se movendo, usando o método "moveWall" do objeto "map"
          this.movingProgressRemaning = 16; // Define a quantidade de movimento restante para 16
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
