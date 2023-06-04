var human,humanImg;
var invisibleGround;
var ground;
var obstaclesGroup1, obstaclesGroup2;
var obstacle1Image, obstacle2Image;
var humanRunning;
var rotationAngle = 0;
var gameState = -1;

function preload(){
  humanImg = loadAnimation("human2.png");
  humanRunning = loadAnimation("human1.png","human2.png","human3.png","human4.png","human5.png");
  obstacle1Image = loadImage("obstacle1.png");
  obstacle2Image = loadImage("obstacle2.png");
}

function setup() {
  createCanvas(1500,400);
  human = createSprite(100, 200, 50, 50);
  human.addAnimation("walk",humanImg);
  human.addAnimation("running",humanRunning);
  human.debug = false;

  invisibleGround = createSprite(800,350,1800,25);
  invisibleGround.visible = false;
  
  ground = createSprite(800,350,1800,25);
  ground.debug = false;
  


  obstaclesGroup1 = createGroup();
  obstaclesGroup2 = createGroup();

}

function draw() {
  background("blue");  
  //console.log(gameState);
  if(gameState === 1){
    if(human.isTouching(invisibleGround)){
      human.collide(invisibleGround)
    }
  
    
      human.changeAnimation("running",humanRunning);
      ground.velocityX = -5;
      
    
  
    if(human.y>290&&keyWentDown("Space")){
      human.velocityY = -10
    }
    console.log(human.x);
  
    if(ground.x < ground.width/8){
      ground.x = 400;
    }
  
    //camera.position.x = human.x;
  
    human.velocityY = human.velocityY+0.5;
    rotationAngle +=10;
    obstaclesGroup1.setRotationEach(rotationAngle);
    obstaclesGroup1.collide(ground);
    obstaclesGroup2.collide(ground);
    if(frameCount%90==0){
      var ran = Math.round(random(1,2))
      switch(ran){
        case 1: 
        spawnObstacles1();
        break;
        case 2:
        spawnObstacles2();
        break;
      }
    }
  }

  if(gameState === 0){
    strokeWeight(3)
    stroke("red")
    textSize(25)
    fill("yellow")
    text("Game Over", 750,200);
    obstaclesGroup1.setVelocityEach(0,0);
    obstaclesGroup2.setVelocityEach(0,0);
    ground.velocityX = 0;
    human.changeAnimation("walk",humanImg);
    human.velocityY = 0;
  }
if(obstaclesGroup1.isTouching(human)|| obstaclesGroup2.isTouching(human)){
  gameState = 0;
}
if(gameState === -1){
  stroke("green")
  fill("red")
  textSize(25)
  text("Press Up Arrow to Begin", 750,200);
}
if(keyWentDown("UP")&& gameState === -1){
  gameState = 1;
  human.x = 100;

}
  drawSprites();

  
}
function spawnObstacles1(){
  //if(frameCount%90==0){
    var obstacle = createSprite(1500,300,100,100);
    obstacle.setCollider("circle",0,0,5);
    obstacle.debug = true;
    obstacle.scale=0.4
  obstacle.velocityX = -1*Math.round(random(4,10));
  obstacle.addImage(obstacle1Image);
  obstaclesGroup1.add(obstacle)
  //}
}

function spawnObstacles2(){
 // if(frameCount%90==0){
    var obstacle = createSprite(1500,300,100,100);
    obstacle.setCollider("circle",0,0,5);
    obstacle.debug = true;
    obstacle.scale=0.4
  obstacle.velocityX = -1*Math.round(random(4,10));
  obstacle.addImage(obstacle2Image);
  obstaclesGroup2.add(obstacle)
 // }
}
