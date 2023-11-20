class OverlapManager {
    private playerSprite: PlayerSprite;

    constructor(playerSprite: PlayerSprite) {
        this.registerOverlaps();
        this.playerSprite = playerSprite;
    }

    private registerOverlaps() {
        sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function(projectile: Sprite, enemy: Sprite): void {
            // GH1
            if(!this.playerSprite.powerupBar.overheated) {
                this.playerSprite.powerupBar.value += 5;
            }
            // end GH1
            info.changeScoreBy(100);
            projectile.destroy();
            enemy.destroy(effects.fire, 100);
        });

        sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(playerSprite: PlayerSprite, enemy: EnemyShip){
            info.changeLifeBy(-1);
            enemy.destroy();
        });

        sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyProjectile, function(playerSprite: PlayerSprite, enemyProjectile: EnemyProjectile){
            info.changeLifeBy(-1);
            enemyProjectile.destroy();
        });
    }
}