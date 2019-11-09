nction makearray(col,row) {
var array = Array.from(Array(col), () => new Array(row));
return array;
}

let grid;
let col;
let row ;
let resolution = 3;


function setup() {
  col = ceil(document.getElementById("Canvas").clientWidth / resolution);
  row = ceil(document.getElementById("Canvas").clientHeight / resolution);
  grid = makearray(col, row)
  for (let i = 0; i < col; i++){
    for (let ii = 0; ii< row; ii++){
      grid[i][ii] = floor(random(2));
    }
  }
}

function draw() {
const c = document.getElementById("Canvas");
const ctx = c.getContext("2d");
  for (let i = 0; i < col; i++) {
    for (let ii = 0; ii < row; ii++) {
      let x = i * resolution;
      let y = ii * resolution;
      if (grid[i][ii] == 1) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(x, y, resolution-1, resolution);
        ctx.lineWidth = 0.2;
        ctx.strokeStyle = "darkgrey";
        ctx.strokeRect(x+0.5, y-0.5, resolution-1, resolution);
        ctx.rect(x, y, resolution-1, resolution);
        }
      else {
        ctx.fillStyle = 'whitesmoke';
        ctx.fillRect(x, y, resolution-1, resolution);
        ctx.lineWidth = 0.2;
        ctx.strokeStyle = "darkgrey";
        ctx.strokeRect(x+0.5, y-0.5, resolution-1, resolution);
        ctx.rect(x, y, resolution-1, resolution);
      }
      }
    }

  let next = makearray(col, row);

  for (let i = 0; i < col; i++) {
    for (let ii = 0; ii < row; ii++) {
      let sum = 0;
      let neighbours = countNeighbours(grid, i, ii);
      let state = grid[i][ii];

      if (state == 0 && neighbours == 3){
        next[i][ii] = 1;
      }

      else if (state == 1 && (neighbours < 2 || neighbours > 3)){
        next[i][ii] = 0;
      }
      else {
        next[i][ii] = state;
      }
    }
  }

grid = next;



}

function countNeighbours(grid, x, y) {
  let sum = 0;
  for (let i=-1; i < 2; i++){
    for (let ii =-1; ii < 2; ii++){
      let cols = (x + i + col) % col;
      let rows = (y + ii + row) % row;
      sum += grid[cols][rows];
    }
  }
sum -= grid[x][y];
return sum;
}
