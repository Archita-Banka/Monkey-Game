// to declare the varibles globally
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score
var ground, invisibleg


// to load the images
function preload(){
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
 bananaImage = loadImage("banana.png");
 obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  // to create the canvas
  createCanvas(500,400);
  
  // to create a monkey sprite
  monkey = createSprite(45,350,20,20);
  monkey.addAnimation("run",monkey_running);
  monkey.scale=0.11;
  
  // to create the ground sprite
  ground = createSprite(500,390,1000,10);
  ground.velocityX= -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  // to create an invisible ground
  invisibleg = createSprite(30,395,500,10);
  invisibleg.visible = false;
  
  // to initially declare the score as 0
  score = 0;
  
   // to create the groups
  bananaGroup= new Group;
  obstacleGroup = new Group;
 
}


function draw() {
  background(180);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival time :"+ score, 220,40);
  score = Math.ceil(frameCount/ frameRate());
  
  if (gamestate === PLAY){
  // to create an infinite ground
  if (ground.x<0){
    ground.x= ground.width/2;}
  
  // to make the monkey jump when space key is pressed
  if (keyDown("space")&& monkey.y >=200 ){
    monkey.velocityY = -12 
  }
   
  // for gravity
  monkey.velocityY = monkey.velocityY +0.8;

  // to make the monkey collide with the ground
  monkey.collide(invisibleg);

 
  fbanana();
  fobstacles();
  
  // to change the game state
  if(monkey.isTouching(obstacleGroup))
  {
  gamestate = END;
  }
  }
  
  else if (gamestate === END)
  {
    ground.velocityX = 0;
    score = 0;
    monkey.destroy();
    text("Game Over",220,200)
    
  }
  
  // to draw the sprites
  drawSprites();  
}

function fbanana(){
  if (frameCount%80  === 0){
    
    // to create banana sprite
    banana = createSprite(500,200,20,20);
    
    // add image to banan
    banana.addImage("bananas",bananaImage);
    
    banana.y = Math.round(random(150,260));
    banana.scale= 0.1;
    banana.velocityX = -4;
    
    // add banana to banana group
    bananaGroup.add(banana);
   
    // prevent memory leak
    banana.lifetime = 125;
    
  }
}

function fobstacles(){
  if (frameCount%150 === 0){
  obstacle =createSprite(500,380,20,10);
  obstacle.addImage("ob",obstaceImage);
  obstacle.velocityX = -4;
  obstacle.lifetime = 150;
  obstacle.scale = 0.3;
  
  obstacleGroup.add(obstacle);
  } 
}






