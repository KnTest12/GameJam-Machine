import * as Phaser from "phaser";

// You can write more code here

/* START OF COMPILED CODE */

export default class BattleGroundScene extends Phaser.Scene {
  constructor() {
    super("BattleGroundScene");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorCreate() {
    this.events.emit("scene-awake");
  }

  preload() {
    this.load.image(
      "placeholderbackground",
      "../assets/placeholderbackground.png",
    );
  }

  /* START-USER-CODE */

  // Write your code here

  create() {
    const map = [
      [0, 0, 0, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 1],
    ];
    const cols = 8;
    const rows = 4;
    const tileWidth = 100;
    const tileHeight = 80;
    const spacing = 10; // spacing between tiles
    const offsetX = (800 - cols * tileWidth) / 2;
    const offsetY = (600 - rows * tileHeight) / 2;

    // Add background image
    this.add.image(400, 300, "placeholderbackground");

    const graphics = this.add.graphics();

    // Map drawing: 4x8 grid with blue/red borders and black transparent fill
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const x = offsetX + col * tileWidth + spacing / 2;
        const y = offsetY + row * tileHeight + spacing / 2;
        const isBlue = map[row][col] === 0;

        // Draw border color based on map value
        graphics.lineStyle(3, isBlue ? 0x007bff : 0xff3b3b, 1);
        graphics.fillStyle(0x000000, 0.3);
        graphics.fillRect(x, y, tileWidth - spacing, tileHeight - spacing);
        graphics.strokeRect(x, y, tileWidth - spacing, tileHeight - spacing);
      }
    }
    this.grid = { cols, rows, tileWidth, tileHeight, offsetX, offsetY };
    this.playerCell = { col: 0, row: 0 };

    // Player creation: green square starts at top-left grid cell
    this.player = this.add
      .rectangle(
        offsetX + this.playerCell.col * tileWidth + tileWidth / 2,
        offsetY + this.playerCell.row * tileHeight + tileHeight / 2,
        tileWidth - 24,
        tileHeight - 24,
        0x00ff00,
      )
      .setOrigin(0.5);

    // Player movement: WASD only, no diagonal movement allowed
    this.input.keyboard.on("keydown", (event) => {
      console.log("Player Location:", this.playerCell); //checks player location
      const moveMap = {
        W: { dx: 0, dy: -1 },
        A: { dx: -1, dy: 0 },
        S: { dx: 0, dy: 1 },
        D: { dx: 1, dy: 0 },
      };

      const move = moveMap[event.key.toUpperCase()];
      if (!move) {
        return;
      }

      const nextCol = this.playerCell.col + move.dx;
      const nextRow = this.playerCell.row + move.dy;
      const { cols, rows } = this.grid;

      if (nextCol < 0 || nextCol >= cols || nextRow < 0 || nextRow >= rows) {
        return;
      }

      // Prevent moving onto red tiles using the map values
      if (map[nextRow][nextCol] !== 0) {
        return;
      }

      this.playerCell.col = nextCol;
      this.playerCell.row = nextRow;
      this.player.setPosition(
        offsetX + nextCol * tileWidth + tileWidth / 2,
        offsetY + nextRow * tileHeight + tileHeight / 2,
      );
    });
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
