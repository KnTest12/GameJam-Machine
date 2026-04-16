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

    this.tileWidth = 140;
    this.tileHeight = 100;
    this.spacing = 10;
    this.padding = 40;

    this.width = this.cols * this.tileWidth + this.padding * 2;
    this.height = this.rows * this.tileHeight + this.padding * 2;

    this.offsetX = this.padding;
    this.offsetY = this.padding;
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
