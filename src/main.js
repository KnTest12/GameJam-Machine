import * as Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#1d1d1d",
  scene: {
    create,
  },
};

function create() {
  this.add.text(100, 100, "Hello Phaser!", {
    fontSize: "32px",
    fill: "#fff",
  });
}

new Phaser.Game(config);
