abstract class BaseProjectile extends sprites.ExtendableSprite{
    private speed: number;
    private angle?: number;

    constructor(originSprite: Sprite, projectileImage: Image, spritekind: number, speed: number, angle?: number) {
        super(projectileImage, spritekind);
        this.setPosition(originSprite.x, originSprite.y);
        this.setFlag(SpriteFlag.AutoDestroy, true);
        this.speed = speed;
        if(angle) {
            this.angle = angle;
        }
        this.fire();
    }

    public fire(): void {
        if(this.angle) {
            let angleInRadians = spriteutils.degreesToRadians(this.angle);
            spriteutils.setVelocityAtAngle(this, angleInRadians, this.speed)
            pause(20);
            return;
        } else {
            this.vy = this.speed;
            console.log("default behaviour")
        }
    }
}

class PlayerProjectile extends BaseProjectile {
    constructor(originSprite: Sprite, speed: number, angle?: number) {
        super(originSprite, assets.image`player projectile`, SpriteKind.Projectile, -speed, angle);
        music.thump.play();
    }
}

class EnemyProjectile extends BaseProjectile {
    constructor(originSprite: Sprite, speed:number, angle?: number) {
        super(originSprite, assets.image`enemy projectile`, SpriteKind.EnemyProjectile, speed, angle);
        music.pewPew.play();
    }
}

// (IGNORE FOR GH1) GH2
class BossProjectile extends BaseProjectile {
    constructor(originSprite: Sprite, speed:number, angle?: number) {
        super(originSprite, assets.image`enemy projectile`, SpriteKind.EnemyProjectile, speed, angle);
        this.scale = 5;
        music.pewPew.play();
    }
}
// end GH2