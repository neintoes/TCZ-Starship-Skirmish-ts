interface iProjectile {
    speed: number;
}

// NOTE: may need a pause for shooting at an angle
abstract class BaseProjectile extends sprites.ExtendableSprite{
    public speed: number;
    angle: number = null;

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

class PlayerProjectile extends BaseProjectile implements iProjectile {
    constructor(originSprite: Sprite, speed: number, angle?: number) {
        super(originSprite, assets.image`player projectile`, SpriteKind.Projectile, -speed, angle);
        music.thump.play();
    }
}

class EnemyProjectile extends BaseProjectile implements iProjectile {
    constructor(originSprite: Sprite, speed:number, angle?: number) {
        super(originSprite, assets.image`enemy projectile`, SpriteKind.EnemyProjectile, speed, angle);
        music.pewPew.play();
    }
}

// GH1
class BossProjectile extends BaseProjectile implements iProjectile {
    constructor(originSprite: Sprite, speed:number, angle?: number) {
        super(originSprite, assets.image`enemy projectile`, SpriteKind.EnemyProjectile, speed, angle);
        this.scale = 5;
        music.pewPew.play();
    }
}
// end GH1