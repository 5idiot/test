/**
 * Created by Jerome on 03-03-16.
 */
//noinspection JSCheckFunctionSignatures,JSCheckFunctionSignatures,JSCheckFunctionSignatures
// var game = new Phaser.Game(24*32, 17*32, Phaser.AUTO, document.getElementById('game'));
// game.state.add('Game',Game);
// game.state.start('Game');

var game = new Phaser.Game(800, 600, Phaser.CANVAS, document.getElementById('game'), { preload: Game.preload, create: Game.create, update: Game.update, render: Game.render });
game.state.add('Game',Game);
game.state.start('Game');