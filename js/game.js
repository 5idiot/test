// const { text } = require("body-parser");

var Game = {};
var speed = 4;
var tt;
var text1 = 0;
var counter = 0;
var temp;
var text2;
var problem1;
var problem2
var problem3
var problem4
var timer;
var pictureA;
var pictureB;
var current = 3;

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    // game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    // game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
    game.load.image('sprite','assets/sprites/sprite.png');
    game.load.image('oo', 'assets/oo.png');
    game.load.image('xx', 'assets/xx.png');
};

Game.create = function(){
    //var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    //testKey.onDown.add(@EventFunction, this);

    //players
    Game.playerMap = {};
    //backgrounds
    game.add.sprite(0,0,'oo');
    game.add.sprite(300,0,'xx');
    //create one player with attendant
    Client.askNewPlayer();

    tt = game.add.sprite(game.world.centerX, game.world.centerY, 'sprite');
    tt.anchor.setTo(0.5,0.5)

    // time contorl - repeat , add
    // game.time.events.repeat(Phaser.Timer.SECOND * 5, 10, Game.runTimeForSolve, this);
    // game.time.events.add(Phaser.Timer.SECOND * 1, Game.runTimeForSolve, this);
    
    haiku4 = "코로나 치료제 중 람데시비르는 FDA 승인을 받았다4";
    pictureA = game.add.text(200, 350, haiku4,  { font: "32px Arial", fill: '#ffffff', backgroundColor: 'rgba(0,255,0,0.25)', wordWrap: true, wordWrapWidth: 450 });
    pictureA.lineSpacing = 20;
    pictureA.alpha = 1;
    // pictureA = game.add.sprite(game.world.centerX, game.world.centerY, 'picture1');
    

    var haiku2 = "코로나 치료제 중 람데시비르는 ";
    pictureB = game.add.text(200, 350, haiku2,  { font: "32px Arial", fill: '#ffffff', backgroundColor: 'rgba(0,255,0,0.25)', wordWrap: true, wordWrapWidth: 450 });
    pictureB.lineSpacing = 20;
    pictureB.alpha = 0;


    timer = game.time.create(false);
    timer.add(3000, Game.fadePictures, this);
    timer.start();
};

Game.fadePictures = function(){
    var tween;

    if (pictureA.alpha === 1)
    {
        tween = game.add.tween(pictureA).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        game.add.tween(pictureB).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
    }
    else
    {
        game.add.tween(pictureA).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
        tween = game.add.tween(pictureB).to( { alpha: 0 },500, Phaser.Easing.Linear.None, true);
    }

    //  When the cross-fade is complete we swap the image being shown by the now hidden picture
    tween.onComplete.add(Game.changePicture, this);
}

Game.changePicture = function() {
    if (pictureA.alpha === 0)
    {
        // pictureA.loadTexture('picture' + current);
        var aa = " 승인을 받았다4";
        pictureA = game.add.text(200, 350, aa,  { font: "32px Arial", fill: '#ffffff', backgroundColor: 'rgba(0,255,0,0.25)', wordWrap: true, wordWrapWidth: 450 });
        pictureA.lineSpacing = 20;
        pictureA.alpha  = 0
    }
    else
    {
        // pictureB.loadTexture('picture' + current);
        var haiku3 = "코로나 치료제 중 람데시비르는 FDA 승인";
        pictureB = game.add.text(200, 350, haiku3,  { font: "32px Arial", fill: '#ffffff', backgroundColor: 'rgba(0,255,0,0.25)', wordWrap: true, wordWrapWidth: 450 });
        pictureB.lineSpacing = 20;
        pictureB.alpha  = 0
    }

    current++;

    if (current > 7)
    {
        current = 1;
    }

    //  And set a new TimerEvent to occur after 3 seconds
    timer.add(3000, Game.fadePictures, this);

}

    
Game.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

Game.addNewPlayer = function(id,x,y){
    Game.playerMap[id] = game.add.sprite(x,y,'sprite');
};

Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var tween = game.add.tween(player);
    var duration = distance*10;
    tween.to({x:x,y:y}, duration);
    tween.start();
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

//key_event
Game.update = function() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        tt.x -= speed;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        tt.x += speed;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {        
        tt.y -= speed;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {        
        tt.y += speed;
    }
    else
    {
    }
}

//Time Check
Game.render = function() {
    game.debug.text("남은 시간: " + timer.duration.toFixed(0), 10, 20);
}