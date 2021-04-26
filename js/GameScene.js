export default class GameScene extends Phaser.Scene
{
    //Input Variables
    leftArrowKey;
    upArrowKey;
    rightArrowKey;

    player;

    //graphics;

    //Physics values
    angleRateOfChange = 0;
    playerSpeed = 0;

    constructor (){
        super('GameScene');
    }

    preload ()
    {
        this.load.image('biker', './assets/sprites/bikerv1.png');
        this.load.image('straightRoad', './assets/sprites/straightRoad.png');
        this.load.image('curveRoad', './assets/sprites/curveRoad.png');
        this.load.image('endCapRoad', './assets/sprites/endCapRoad.png');
        this.load.image('finishRoad', './assets/sprites/finishRoad.png')
    }

    create(){
        //Setup Input Variables
        this.leftArrowKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.upArrowKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.rightArrowKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //TODO: Setup Map
        var road1 = this.add.sprite(200,200, 'straightRoad');
        var road2 = this.add.sprite(200,264, 'straightRoad');
        var road3 = this.add.sprite(200,328, 'curveRoad');
        road3.angle  = 180;
        //graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });

        //Setup Biker
        this.player = this.physics.add.image(200, 200, 'biker');
        this.player.setCollideWorldBounds(true);

        //Setup Camera
        var camera = this.cameras.main;
        camera.setBounds(0, 0, 800, 600);
        camera.startFollow(this.player);
        camera.setZoom(4);
    }

    update(time, delta){
        if (this.upArrowKey.isDown) {
            //accelerate
            if(this.playerSpeed < 2){
                this.playerSpeed += .0002*delta;
            }
        }
        else {
            //decelearate
            if(this.playerSpeed > 0){
                this.playerSpeed -= .0002*delta;

                //straighten out player as they slow down
                if (this.angleRateOfChange < 0) {
                    this.angleRateOfChange += .002*delta/(this.playerSpeed+.1);
                }
                if (this.angleRateOfChange > 0){
                    this.angleRateOfChange -= .002*delta/(this.playerSpeed+.1);
                }
            }
        }
        if (this.leftArrowKey.isDown) {
            if (this.angleRateOfChange > -1.5) {
                this.angleRateOfChange -= .005*delta;
            }
        }
        if (this.rightArrowKey.isDown)
        {
            if (this.angleRateOfChange < 1.5) {
                this.angleRateOfChange += .005*delta;
            }
        }

        //update biker position based on speed
        if (this.playerSpeed > 0){
        
            this.player.angle += this.angleRateOfChange*this.playerSpeed*delta/10;

            this.player.x += Math.sin(this.player.angle*3.1415/180)*this.playerSpeed*delta/10;
            this.player.y -= Math.cos(this.player.angle*3.1415/180)*this.playerSpeed*delta/10;
        }
    }
}