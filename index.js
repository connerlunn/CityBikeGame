var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('biker', './assets/sprites/bikerv1.png')
}

function create ()
{
    var biker = this.physics.add.image(200, 200, 'biker');
    var text = this.add.text(0, 0, '', { font: '"Arial"' });
    var graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });

    biker.setCollideWorldBounds(true);

    var angleRateOfChange = 0;
    var previousX = biker.x;
    var previousY = biker.y;

    this.input.keyboard.on('keyup', function (event) {

        text.text = "Angle: " + Math.round(biker.angle) + "   // AngleRateOfChange: " + angleRateOfChange;



        if (event.keyCode === 37)
        {
            //  left
            if (angleRateOfChange > -10) {
                angleRateOfChange -= 2;
            }

        }
        else if (event.keyCode === 39)
        {
            //  right
            if (angleRateOfChange < 10) {
                angleRateOfChange += 2;
            }
        }
        else if (event.keyCode === 38)
        {
            //  up
            biker.angle += angleRateOfChange;

            biker.x += Math.sin(biker.angle*3.1415/180)*10;
            biker.y -= Math.cos(biker.angle*3.1415/180)*10;

            var line = new Phaser.Geom.Line(previousX, previousY, biker.x, biker.y);
            graphics.strokeLineShape(line);

            previousX = biker.x;
            previousY = biker.y;
        }
        else if (event.keyCode === 40)
        {
            //  down
            //biker.y += 10;
        }
    });
}


function update()
{

}