
export function createEnemyFlamesAnimation(scene) {

    if (!scene.anims.exists('enemyFlames')) {
      scene.anims.create({
        key: 'enemyFlames',
        frames: scene.anims.generateFrameNumbers('scout_engine', {
          start: 0,
          end: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }
  }
  