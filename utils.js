const utils = {
    withGrid(n) { // Método que recebe um número "n" e retorna o resultado da multiplicação por 16, usado para converter valores em pixels para valores na grade do jogo
      return n * 16;
    },
    asGridCoord(x, y) { // Método que recebe coordenadas em pixels "x" e "y" e retorna uma string com as coordenadas na grade do jogo, usada para identificar paredes
      return `${x * 16}, ${y * 16}`;
    },
    nextPosition(initialX, initialY, direction) { // Método que recebe a posição inicial do personagem "initialX" e "initialY" e a direção "direction" que o personagem está se movendo e retorna a próxima posição do personagem
      let x = initialX;
      let y = initialY;
      const size = 16; // Tamanho de cada célula da grade do jogo
      if (direction === "left") { // Se a direção for "esquerda", decrementa o valor de "x" em "size"
        x -= size;
      } else if (direction === "right") { // Se a direção for "direita", incrementa o valor de "x" em "size"
        x += size;
      } else if (direction === "up") { // Se a direção for "cima", decrementa o valor de "y" em "size"
        y -= size;
      } else if (direction === "down") { // Se a direção for "baixo", incrementa o valor de "y" em "size"
        y += size;
      }
      return { x, y }; // Retorna um objeto com as novas coordenadas "x" e "y"
    }
  };
  