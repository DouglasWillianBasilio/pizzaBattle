class Sprite {
    constructor(config) {

        //set up the image
        this.image = new Image();
        this.image.scr = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        //Configure Animations e initial state
        this.animations = config.animations || {
            idleDown: [
                [0,0]
            ]
        }
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        //reference the game object 
        this.gameObject = config.gameObject;
    }

    draw(ctx) {
        const x = this.gameObject.x * 16 - 8;
        const y = this.gameObject.y * 16 - 18;

        this.isLoaded && ctx.drawImage(this.image,
            0,0,
            32,32,
            x,y,
            32,32,
            )
    }
}