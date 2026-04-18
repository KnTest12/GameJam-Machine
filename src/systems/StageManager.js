import { SCENES } from "../constants/scenes.js";

export default class StageManager {
  constructor(scene, startStage = 0) {
    this.scene = scene;
    this.currentStage = startStage;

    //temp
    this.stages = [
      [{ type: "turret", col: 5, row: 1 }],
      [
        { type: "coil", col: 5, row: 0 },
        { type: "turret", col: 5, row: 2 },
      ],
      [
        { type: "turret", col: 4, row: 0, offset: 0 },
        { type: "coil", col: 5, row: 1, offset: 0 },
        { type: "coil", col: 5, row: 2, offset: 600 },
        { type: "turret", col: 4, row: 3, offset: 400 },
      ],
    ];
  }

  startStage() {
    const stage = this.stages[this.currentStage];
    this.scene.enemies.clear(true, true);

    stage.forEach((data) => {
      this.scene.spawnEnemy(data);
    });
  }

  isStageCleared() {
    return this.scene.enemies.countActive() === 0;
  }

  nextStage() {
    this.currentStage++;

    if (this.currentStage >= this.stages.length) {
      this.scene.scene.start(SCENES.END);
      return;
    }

    this.startStage();
  }
}
