export function createSceneOverlay(scene, width, height) {
  scene.add.rectangle(width / 2, height / 2, width, height, 0x000000);

  const border = scene.add.graphics();
  border.lineStyle(1, 0x00ff41, 0.15);
  border.strokeRect(30, 30, width - 60, height - 60);

  const rules = scene.add.graphics();
  rules.lineStyle(1, 0x00ff41, 0.08);
  rules.lineBetween(40, 160, width - 40, 160);
  rules.lineBetween(40, height - 160, width - 40, height - 160);

  const brackets = scene.add.graphics();
  brackets.lineStyle(1.5, 0x00ff41, 0.45);
  const s = 16;

  brackets.lineBetween(40, 40 + s, 40, 40);
  brackets.lineBetween(40, 40, 40 + s, 40);

  brackets.lineBetween(width - 40, 40 + s, width - 40, 40);
  brackets.lineBetween(width - 40, 40, width - 40 - s, 40);

  brackets.lineBetween(width - 40, height - 40 - s, width - 40, height - 40);
  brackets.lineBetween(width - 40, height - 40, width - 40 - s, height - 40);

  brackets.lineBetween(40, height - 40 - s, 40, height - 40);
  brackets.lineBetween(40, height - 40, 40 + s, height - 40);

  const dots = scene.add.graphics();
  dots.fillStyle(0x00ff41, 0.12);
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 8; c++) {
      dots.fillCircle(width - 120 + c * 10, 50 + r * 10, 1.2);
      dots.fillCircle(60 + c * 10, height - 80 + r * 10, 1.2);
    }
  }

  return { border, rules, brackets, dots };
}
