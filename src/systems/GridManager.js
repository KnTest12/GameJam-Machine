export default class GridManager {
  constructor(scene) {
    this.scene = scene;
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

    if (scene) {
      this.offsetX =
        Math.floor((scene.scale.width - this.width) / 2) + this.padding;
      this.offsetY =
        Math.floor((scene.scale.height - this.height) / 2) + this.padding;
    } else {
      this.offsetX = this.padding;
      this.offsetY = this.padding;
    }

    this.highlights = {};
    this.activeTiles = {};
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

  highlightTiles(tiles, color = 0xff9000, id = "default") {
    tiles.forEach(({ col, row }) => {
      if (this.map[row][col] !== 0) return;
      const key = `${id},${col},${row}`;
      if (this.highlights[key]) return;

      const x = this.offsetX + col * this.tileWidth + this.spacing / 2;
      const y = this.offsetY + row * this.tileHeight + this.spacing / 2;
      const w = this.tileWidth - this.spacing;
      const h = this.tileHeight - this.spacing;

      const gfx = this.scene.add.graphics();
      gfx.fillStyle(color, 0.4);
      gfx.fillRect(x, y, w, h);
      gfx.lineStyle(3, color, 1);
      gfx.strokeRect(x, y, w, h);

      this.highlights[key] = gfx;
    });
  }

  activateTiles(tiles, color = 0xff6600, id = "default") {
    tiles.forEach(({ col, row }) => {
      if (this.map[row][col] !== 0) return;
      const key = `${id},${col},${row}`;
      if (this.activeTiles[key]) return;

      const x = this.offsetX + col * this.tileWidth + this.spacing / 2;
      const y = this.offsetY + row * this.tileHeight + this.spacing / 2;
      const w = this.tileWidth - this.spacing;
      const h = this.tileHeight - this.spacing;

      const gfx = this.scene.add.graphics();
      gfx.fillStyle(color, 0.5);
      gfx.fillRect(x, y, w, h);
      gfx.lineStyle(3, color, 1);
      gfx.strokeRect(x, y, w, h);

      this.activeTiles[key] = gfx;
    });
  }

  clearHighlights(tiles, id = "default") {
    tiles.forEach(({ col, row }) => {
      const key = `${id},${col},${row}`;
      if (this.highlights[key]) {
        this.highlights[key].destroy();
        delete this.highlights[key];
      }
    });
  }

  deactivateTiles(tiles, id = "default") {
    tiles.forEach(({ col, row }) => {
      const key = `${id},${col},${row}`;
      if (this.activeTiles[key]) {
        this.activeTiles[key].destroy();
        delete this.activeTiles[key];
      }
    });
  }

  isTileDangerous(col, row) {
    return Object.keys(this.activeTiles).some((key) =>
      key.endsWith(`,${col},${row}`),
    );
  }

  clearAllActiveTiles() {
    Object.keys(this.activeTiles).forEach((key) => {
      this.activeTiles[key].destroy();
    });
    this.activeTiles = {};
  }
}
