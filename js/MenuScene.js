export default class MenuScene extends Phaser.Scene
{
    constructor (){
        super('MenuScene');
    }

    create(){
        this.add.text(0, 0, 'Up Arrow to Accelerate.\nLeft and Right Arrows to turn. \nPress any arrow key to start. ', {fontSize: '32px'});
        var thisHolder = this;

        //Start game when player presses an arrow key;
        this.input.keyboard.on('keyup', function (event) {
            if (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){
                thisHolder.scene.start('GameScene');
            }
        });
    }
}