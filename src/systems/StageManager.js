import { SCENES } from "../constants/scenes.js";

export default class StageManager {
  constructor(scene, startStage = 0) {
    this.scene = scene;
    this.currentStage = startStage;

    this.stages = [
      [
        { type: "turret", col: 5, row: 1, offset: 1000 },
        { type: "turret", col: 5, row: 2 },
      ],
      [
        { type: "turret", col: 5, row: 1, offset: 1000 },
        { type: "turret", col: 5, row: 2 },
        { type: "coil", col: 7, row: 1 },
        { type: "coil", col: 7, row: 2, offset: 1500 },
        { type: "bomb", col: 7, row: 0 },
        { type: "bomb", col: 7, row: 3, offset: 500 },
      ],
      [
        { type: "turret", col: 4, row: 0 },
        { type: "turret", col: 4, row: 3, offset: 1000 },
        { type: "turret", col: 7, row: 0, offset: 2500 },
        { type: "turret", col: 7, row: 3, offset: 3500 },
        { type: "coil", col: 6, row: 1 },
        { type: "coil", col: 6, row: 2, offset: 1500 },
      ],
      [
        { type: "mobile", col: 4, row: 3 },
        { type: "mobile", col: 7, row: 0 },
      ],
      [
        { type: "turret", col: 4, row: 0 },
        { type: "turret", col: 5, row: 1, offset: 1000 },
        { type: "turret", col: 5, row: 2, offset: 2500 },
        { type: "turret", col: 4, row: 3, offset: 3500 },
        { type: "bomb", col: 7, row: 0 },
        { type: "bomb", col: 7, row: 2 },
        { type: "nova", col: 7, row: 1 },
        { type: "nova", col: 7, row: 3, offset: 2000 },
      ],
      [
        { type: "zone", col: 6, row: 1 },
        { type: "zone", col: 6, row: 2, offset: 3000 },
        { type: "zone", col: 7, row: 1, offset: 6000 },
        { type: "zone", col: 7, row: 2, offset: 9000 },
      ],
      [
        { type: "mobile", col: 4, row: 2 },
        { type: "mobile", col: 5, row: 3 },
        { type: "zone", col: 7, row: 1 },
        { type: "zone", col: 7, row: 2, offset: 3000 },
        { type: "bomb", col: 7, row: 0 },
        { type: "bomb", col: 7, row: 3, offset: 2000 },
      ],
      [
        { type: "mobile", col: 4, row: 0 },
        { type: "mobile", col: 5, row: 1, offset: 1000 },
        { type: "mobile", col: 6, row: 2, offset: 2000 },
        { type: "nova", col: 7, row: 1 },
        { type: "nova", col: 7, row: 2, offset: 2000 },
        { type: "coil", col: 7, row: 0 },
        { type: "coil", col: 7, row: 3, offset: 2000 },
      ],
      [
        { type: "turret", col: 4, row: 0 },
        { type: "turret", col: 4, row: 3, offset: 1000 },
        { type: "turret", col: 7, row: 0, offset: 5000 },
        { type: "turret", col: 7, row: 3, offset: 7000 },
        { type: "nova", col: 5, row: 1 },
        { type: "mobile", col: 6, row: 0 },
        { type: "zone", col: 7, row: 1 },
        { type: "bomb", col: 5, row: 2 },
        { type: "coil", col: 7, row: 2 },
      ],
      [{ type: "boss", col: 7, row: 1 }],
    ];
  }

  startStage() {
    if (this.currentStage === this.stages.length - 1) {
      this.scene.audio.playBgm("bossBattle");
    }

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
