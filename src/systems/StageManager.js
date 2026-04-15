import { SCENES } from "../constants/scenes.js";

export default class StageManager {
  constructor(scene) {
    this.scene = scene;
    this.currentStage = 0;

    //temp
    this.stages = [
      [{ type: "turret", x: 600, y: 300 }],
      [
        { type: "turret", x: 600, y: 200 },
        { type: "turret", x: 600, y: 400 },
      ],
      [
        { type: "turret", x: 500, y: 150 },
        { type: "turret", x: 600, y: 300 },
        { type: "turret", x: 500, y: 450 },
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
      this.scene.scene.start(SCENES.GAME_OVER);
      return;
    }

    this.startStage();
  }
}
