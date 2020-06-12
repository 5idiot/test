var Game = {};
var speed = 4;
var human;
var textA;
var textB;
var probA;
var probB;
var timer;
var current = 2;

const ProblemLength = 8;
var ProblemList = ["감염이 의심될 때, 상담할 수 있는 전화번호는 1399이다.", "해외 입국자는 입국일로부터 만 14일의 낮 12시까지 격리해야 한다.", "세계보건기구(WTO)에 의하면 다이크로뮴산칼륨으로 소독작업을 할 수 있다.",
"2020년 5월 14일자 새로운 5대 수칙에 의하면, 환기는 하루에 2번 이상 권고한다.", "지방자치단체는 정신건강복지센터를 통해 자가격리자만을 위해 심리상담 핫라인을 운영한다.", 
"지방자치단체에서 운영하는 심리상담 핫라인 번호는 1577-0119이다.", "코로나 예방 수칙 중 비누와 흐르는 물에 최소 '30초 이상' 손을 씻도록 안내한다.", "손을 비누에 씻어야 하는 이유는 바이러스의 방어막 역할을 하는 '엔벨로프'를 녹이기 위함이다."]

var AnswerList = ["X","X","X","O","X","O","O","O"]
var DescriptionList = ["질병관리본부의 전화번호는 1399가 아닌 1339이다.", "해외에서 입국한 후 만 14일 24시(밤 12시)까지 의무로 격리해야 한다.", "차아염소산나트륨(락스의 주성분)으로 노출 표면을 소독 작업을 시행한다. 다이크로뮴산칼륨은 인체에 유해한 물질이다.",
"매일 두 번 이상 환기하고, 자주 소독하기를 권고하고 있다.", "코로나블루를 극복하기 위한 심리상담 핫라인은 자가격리자뿐만 아니라 일반 국민도 이용할 수 있다.", "코로나블루를 극복하기 위해 1577-0119를 통해 심리상담을 신청할 수 있다.", 
"코로나 예방을 위해 30초 이상 손을 씻어야 한다.", "감염을 일으키는 돌기 형태의 스파이크 단백질이 존재하는데, 바이러스의 가장 바깥쪽 방어막 역할을 하는 지방질 성분의 ‘엔벨로프’에 달라붙어 있다. 이를 계면활성제로 제거할 수 있기 때문에 손을 비누로 씻어야 한다."]

const textBoxBackgroundColor = 'rgba(127,127,0,0.5)';

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    game.load.image('sprite','assets/sprite.png');
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
    game.input.mouse.capture = true;
    game.input.onDown.add(Game.getCoordinates, this)
    
    //create one player with attendant
    Client.askNewPlayer();

    // human = game.add.sprite(game.world.centerX, game.world.centerY, 'sprite');
    // human.anchor.setTo(0.5,0.5)

    // time contorl - repeat , add
    // game.time.events.repeat(Phaser.Timer.SECOND * 5, 10, Game.runTimeForSolve, this);
    // game.time.events.add(Phaser.Timer.SECOND * 1, Game.runTimeForSolve, this);
    

    textA = ProblemList[0];
    probA = game.add.text(300, 400, textA,  { font: "32px Arial", fill: '#ffffff', backgroundColor: textBoxBackgroundColor, wordWrap: true, wordWrapWidth: 450 });
    probA.lineSpacing = 20;
    probA.alpha = 1;
    
    textB = ProblemList[1];
    probB = game.add.text(300, 400, textB,  { font: "32px Arial", fill: '#ffffff', backgroundColor: textBoxBackgroundColor, wordWrap: true, wordWrapWidth: 450 });
    probB.lineSpacing = 20;
    probB.alpha = 0;

    timer = game.time.create(false);
    timer.add(3000, Game.fadeProblems, this);
    timer.start();
};

Game.fadeProblems = function(){
    //check attendants answer;
    for (var key in Game.playerMap) {
        let tempPlayer = Game.playerMap[key];
        let correctAnswer = AnswerList[current]    
        if (correctAnswer === "O"){
            if (0<= tempPlayer.world.x && tempPlayer.world.x < 300 && 0<= tempPlayer.world.y && tempPlayer.world.y < 300){
                console.log(key + "O")
                console.log(tempPlayer);
            }
            else { 
                Game.movePlayer(key, 980, 780)
            }
        }
        else {
            if (300<= tempPlayer.world.x && tempPlayer.world.x < 600 && 0<= tempPlayer.world.y && tempPlayer.world.y < 300){
                console.log(key + "X")
            }
            else {
                Game.movePlayer(key, 980, 780)
            }
        }
    }
    
    var tween;

    if (probA.alpha === 1)
    {
        tween = game.add.tween(probA).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        game.add.tween(probB).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
    }
    else
    {
        game.add.tween(probA).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
        tween = game.add.tween(probB).to( { alpha: 0 },500, Phaser.Easing.Linear.None, true);
    }

    tween.onComplete.add(Game.changeProblem, this);
}

Game.changeProblem = function() {
    if (probA.alpha === 0)
    {
        probA = game.add.text(300, 400, ProblemList[current],  { font: "32px Arial", fill: '#ffffff', backgroundColor: textBoxBackgroundColor, wordWrap: true, wordWrapWidth: 450 });
        probA.lineSpacing = 20;
        probA.alpha  = 0
    }
    else
    {
        probB = game.add.text(300, 400, ProblemList[current],  { font: "32px Arial", fill: '#ffffff', backgroundColor: textBoxBackgroundColor, wordWrap: true, wordWrapWidth: 450 });
        probB.lineSpacing = 20;
        probB.alpha  = 0
    }

    current++;
    //종료
    if (current > 7) current = 1;

    timer.add(3000, Game.fadeProblems, this);

}

    
Game.getCoordinates = function(pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

Game.addNewPlayer = function(id,x,y){
    Game.playerMap[id] = game.add.sprite(x,y,'sprite');
};

Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    //moouse pointer to sprite box center
    player.anchor.setTo(0.5,0.5);
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var tween = game.add.tween(player);
    // var duration = distance*10;
    tween.to({x:x,y:y}, 1000);
    tween.start();

    
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

//key_event
Game.update = function() {
    // if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) human.x -= speed;
    // else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) human.x += speed;
    // else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) human.y -= speed;
    // else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) human.y += speed;
    // else{}
}

//Time Check
Game.render = function() {
    game.debug.text("남은 시간: " + timer.duration.toFixed(0), 10, 780);
}