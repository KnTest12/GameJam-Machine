export default class GridManager {
  constructor() {
    this.map = [
      [0, 0, 0, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 1],
    ];

    this.cols = 8;
    this.rows = 4;

    this.tileWidth = 100;
    this.tileHeight = 60;
    this.spacing = 10;

    this.offsetX = (800 - this.cols * this.tileWidth) / 2;
    this.offsetY = (600 - this.rows * this.tileHeight) / 2;
  }

  isWalkable(row, col) {
    return this.map[row][col] === 0;
  }

  isValid(col, row) {
    if (col < 0 || col >= this.cols) return false;
    if (row < 0 || row >= this.rows) return false;
    return this.map[row][col] === 0; // 0 = blue = player side only
  }

  getBounds() {
    return {
      cols: this.cols,
      rows: this.rows,
    };
  }

  gridToWorld(col, row) {
    return {
      x: this.offsetX + col * this.tileWidth + this.tileWidth / 2,
      y: this.offsetY + row * this.tileHeight + this.tileHeight / 2,
    };
  }
}
