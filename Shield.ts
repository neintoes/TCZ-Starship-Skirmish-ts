// GH3
class Shield extends sprites.ExtendableSprite {

    constructor(playerSprite: PlayerSprite) { 
        super(assets.image`shield`, SpriteKind.Shield);
        this.setPosition(playerSprite.x, playerSprite.y);
        this.scale = 2;
    }
}
// end GH3