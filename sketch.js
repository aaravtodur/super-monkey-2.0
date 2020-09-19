var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground;
var invisibleGround;
var score=0;
var survitime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
 bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  monki = loadImage("sprite_0.png")
}



function setup() {
  createCanvas(600, 600);
  monkey = createSprite(50,350,20,50);
monkey.addAnimation("running", monkey_running);
monkey.scale = 0.1;
  
  ground = createSprite(200,400,2000,20);
//ground.addImage("ground",groundImage);
ground.x = ground.width /2;
  
   
   
  invisibleGround = createSprite (200,400,400,10);
invisibleGround.visible=false;

   FoodGroup = new Group();
 obstacleGroup = new Group();

monkey.setCollider("circle",0,0,275);
  
  //monkey.debug = true
  
}


function draw() {
background(220);

  fill(220);
 text( "score "+score,500,40) 
  score=score+Math.round(frameCount/10); 
 
  stroke("black")
  textSize(20);
  fill("black");
  survitime=Math.ceil(frameCount/frameRate())
  text( "survival time: "+survitime,100,50) 
  
  if(gameState === PLAY){
  
    ground.velocityX = -4
    
    if (keyDown("space") && monkey.y >=156) {
  monkey.velocityY = -15;
}
  
  monkey.velocityY = monkey.velocityY + 0.8
  
if (ground.x < 0) {
  ground.x = ground.width / 2;
}
monkey.collide(invisibleGround);

   spawnbanana ();
 spawnObstacles();

    
      if(FoodGroup.isTouching(monkey)){
  FoodGroup.visible=false;
  }
      
      if(obstacleGroup.isTouching(monkey)){
  gameState=END;
  }
  
 
  }
  else if(gameState === END){
    //stop the ground
    ground.velocityX = 0;
    

    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);   
     
     obstacleGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
     
    
  monkey.collide(invisibleGround);
  
    stroke(220)
  textSize(20);
  fill(220);
  survitime=Math.ceil(frameCount/frameRate())
  text( "survival time: "+survitime,100,50) 
  
    score=0;
  }  
  
  
  drawSprites();


}

function spawnObstacles (){
  if(frameCount%100===0){
  var obstacle=createSprite (600,375,10,40)
   obstacle.addImage("gro",obstaceImage);
    obstacle.velocityX=-6; 
     obstacle.scale = 0.1; 
   obstacle.lifetime = 300;
  obstacleGroup.add(obstacle);
  }
}

function spawnbanana (){
  if(frameCount%100===0){
  var banana=createSprite (600,250,10,40)
   banana.addImage("grop", bananaImage);
    banana.velocityX=-6; 
     banana.scale = 0.1; 
   banana.lifetime = 300;
  FoodGroup.add(banana);
  }
}

