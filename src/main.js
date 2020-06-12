var game = new Phaser.Game(1000, 800, Phaser.CANVAS, document.getElementById('game'), { preload: Game.preload, create: Game.create, update: Game.update, render: Game.render });
game.state.add('Game',Game);
game.state.start('Game');