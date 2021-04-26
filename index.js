import MenuScene from './js/MenuScene.js'
import GameScene from './js/GameScene.js'

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [ MenuScene, GameScene ],
};

var game = new Phaser.Game(config);