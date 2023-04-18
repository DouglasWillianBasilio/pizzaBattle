// Classe DirectionInput que representa a entrada de direções do usuário
class DirectionInput {
    // Construtor da classe DirectionInput
    constructor() {
        // Inicializa a lista de direções pressionadas pelo usuário com um array vazio
        this.heldDirections = [];

        // Define um mapeamento de teclas do teclado para direções
        this.map = {
            "ArrowUp": "up",
            "KeyW": "up",
            "ArrowDown": "down",
            "KeyS": "down",
            "ArrowLeft": "left",
            "KeyA": "left",
            "ArrowRight": "right",
            "KeyD": "right",
        }
    }

    // Método getter que retorna a primeira direção da lista de direções pressionadas pelo usuário
    get direction() {
        return this.heldDirections[0];
    }

    // Método init que inicializa os eventos de teclado para detectar as direções pressionadas pelo usuário
    init() {
        // Adiciona um evento de teclado para quando uma tecla é pressionada
        document.addEventListener("keydown", e => {
            // Obtém a direção correspondente à tecla pressionada
            const dir = this.map[e.code];
            // Verifica se a tecla pressionada corresponde a uma direção mapeada e se a direção ainda não está na lista de direções pressionadas
            if(dir && this.heldDirections.indexOf(dir) === -1) {
                // Adiciona a direção pressionada na primeira posição da lista de direções pressionadas
                this.heldDirections.unshift(dir);
                console.log(this.heldDirections)
            }
        });
        // Adiciona um evento de teclado para quando uma tecla é solta
        document.addEventListener("keyup", e=> {
            // Obtém a direção correspondente à tecla solta
            const dir = this.map[e.code];
            // Obtém o índice da direção solta na lista de direções pressionadas
            const index = this.heldDirections.indexOf(dir);
            // Verifica se a direção solta está na lista de direções pressionadas
            if(index > -1){
                // Remove a direção solta da lista de direções pressionadas
                this.heldDirections.splice(index, 1);
            }
        })

    }
}
