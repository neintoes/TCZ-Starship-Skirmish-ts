// GH3
abstract class Pickup extends sprites.ExtendableSprite {
    constructor(
        image: Image, 
        spriteKind: number, 
        xSpawn: number, 
        ySpawn: number, 
        xSpeed: number, 
        ySpeed: number
    ) {
        super(image, spriteKind);
        this.setPosition(xSpawn, ySpawn);
        this.setVelocity(xSpeed, ySpeed);
    }
}

class ShieldPickup extends Pickup{
    constructor(sprite: Sprite){
        super(
            assets.image`shield pickup`, 
            SpriteKind.ShieldPickup, 
            sprite.x, 
            sprite.y,
            0,
            50
        );
    }
}
// GH3