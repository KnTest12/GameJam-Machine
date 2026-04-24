export default class UIManager {
  constructor(scene, player, stage) {
    this.scene = scene;
    this.player = player;
    this.stage = stage;

    this.hpText = this.scene.add
      .text(40, 20, `INTEGRITY: ${this.player.health.hp}`, {
        fontSize: "20px",
        color: "#00ff99",
        fontFamily: "monospace",
      })
      .setDepth(10);

    this.currentStageText = this.scene.add
      .text(1000, 20, `CURRENT DATA CLUSTER: ${this.stage.currentStage + 1}`, {
        fontSize: "20px",
        color: "#00ff99",
        fontFamily: "monospace",
      })
      .setDepth(10);
  }

  update() {
    this.hpText.setText(`INTEGRITY: ${this.player.health.hp}`);
    this.currentStageText.setText(
      `CURRENT DATA CLUSTER: ${this.stage.currentStage + 1}`,
    );
  }
}
