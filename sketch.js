var PLAY=1;
var END=0;
var gameState=1;
var score = 0;
var backgroundImage,background1,ground,sound;
var player,playerImage,coin,coinImage,coinsGroup;
var obstacle1Image,obstacle1,obstacle2Image,obstacle2;
var obstacle3Image,obstacle3,obstaclesGroup;
var gameOver, gameOverImage;

function preload(){
  backgroundImage = loadImage("ground.jpg");
  playerImage=loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png",   "8.png");
  obstacle1Image = loadImage("obstacle(a)1.png");
  obstacle2Image = loadImage("obstacle(a)2.png");
  obstacle3Image = loadAnimation("(a)obstacle(b)3.png","11.png","(c)obstacle(b)3.png","(d)obstacle(b)3.png");
  coinImage = loadImage("coin.png");
  gameOverImage = loadImage("gameover.jpg");
  sound = loadSound("sound.mp3");
}

function setup() {
  createCanvas(700, 400);
  
  background1=createSprite(500,160,50,50);
  background1.addImage(backgroundImage);
  background1.scale=1.2;
  background1.velocityX=-8;

  ground = createSprite(350,370,700,10);
  ground.visible = false;
  
  player = createSprite(80,300,50,50);
  player.addAnimation("moving",playerImage);
  player.scale=0.6;
  //player.debug = true;
  player.setCollider("rectangle",10,0,80,180);
  
  obstaclesGroup = new Group();
  coinsGroup = new Group();
  sound.loop();
}

function draw() {
  
  if(background1.x<1){
    background1.x=500
   }
   
  if(keyDown("space") && player.y>=150){
    player.velocityY=-12;
  }
  player.velocityY = player.velocityY + 0.8
  player.collide(ground);
  
  if(gameState===PLAY){
    spawnObstacle1();
    spawnObstacle2();
    spawnObstacle3();
    coins();
    
  if(player.isTouching(coinsGroup)){
    score=score+2;
    coinsGroup.destroyEach();
  }
    
  if(player.isTouching(obstaclesGroup)){
      gameState=END;
    }
       
   }
  
  if(gameState===END){
     obstaclesGroup.destroyEach();
     player.destroy();
     coinsGroup.destroyEach();
     background1.velocityX=0;
     gameOver=createSprite(350,200)
     gameOver.addImage(gameOverImage);
     gameOver.scale=0.8;
   }
  
  drawSprites();
  
  textSize(25);
  fill("white");
  text("Score: "+score,590,30);
}

function spawnObstacle1(){
   obstacle1 = createSprite(750,320);
   if(frameCount%250===0){
    obstacle1.addImage(obstacle1Image);
    obstacle1.scale=0.4;        
    obstacle1.velocityX=-8;
    obstacle1.lifetime=100;
    //obstacle1.debug=true;
  }
    obstaclesGroup.add(obstacle1);
}

function spawnObstacle2(){
   obstacle2 = createSprite(750,360);
  if(frameCount%100===0){
    obstacle2.addImage(obstacle2Image);
    obstacle2.scale=0.5;
    obstacle2.velocityX=-8;
    obstacle2.lifetime=120;
    //obstacle2.debug=true;
    obstacle2.setCollider("rectangle",0,0,200,80)
  }
    obstaclesGroup.add(obstacle2);
}

function spawnObstacle3(){
  obstacle3=createSprite(750,random(50,200));
  if(frameCount%160===0){
    obstacle3.addAnimation("moving",obstacle3Image);
    obstacle3.scale=0.3;
    obstacle3.velocityX=-8;
    obstacle3.lifetime=120;
    //obstacle3.debug=true;
  }
    obstaclesGroup.add(obstacle3);
}

function coins(){
   coin = createSprite(750,random(100,270));
   if(frameCount%80===0){
   coin.addImage(coinImage);
   coin.scale=0.2;
   coin.velocityX=-8;
   coin.lifetime=120;
   //coin.debug=true;
  }
   coinsGroup.add(coin);
}
