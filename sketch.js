const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var city;
var hotel;
var school;
var coins;
var girl;
var background1;
var schools=[]

function preload(){
    backgroundImg = loadImage("./assets/city.png")
    schoolImg = loadImage("./assets/building.png")
    hotelImg = loadImage("./assets/hotel.png")
    coinsImg = loadImage ("./assets/goldCoin.png")
    girlImg = loadImage("./assets/girl2.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  background1 = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight)
  background1.addImage(backgroundImg)
  background1.setVelocity(-0.5,0) 
  background1.scale= 3
engine = Engine.create();
  world = engine.world;
  ground = new Ground(windowWidth/2,windowHeight-10,windowWidth,20);
//building1 = new Building(windowWidth-100,windowHeight-100,200,400)
girl = new Girl(windowWidth-1000,windowHeight-80,120,140)
school1 = new School(windowWidth-150,windowHeight-15,400,800)
}

function draw(){
    background(backgroundImg)
    drawSprites()
    if(background1.position.x<550){
      background1.position.x =windowWidth/2
    }
    
   // building1.display()
    girl.display()
    ground.show()
    school1.display()
    Engine.update(engine);
    school1.move()
    showBuildings()
    collisionWithGirl()
}
function keyReleased(){
  //if(keyCode===UP_ARROW){
    //Matter.Body.applyForce(girl,{x:0,y:0},{x:50,y:-0.5}) 
   // girl.jump()
    //console.log("KK")
  //}
  //}        
  if(keyDown(UP_ARROW)){
    girl.jump()
    console.log("jumpgirl")
  }
  
}
function showBuildings(){
if(schools.length> 0){
  if(
    schools.length< 4 &&
    schools[schools.length -1].body.position.x < width -300

  ){
    var positions = [-40, -60 , -70, -20];
    var position = random(positions);
    var school1 = new School(
      width,
      height -100,
      170,
      170,
      position
    );
    schools.push(school1);
  }
  for(var i = 0; i<schools.length; i++){
    Matter.Body.setVelocity(schools[i].body,{
      x: -0.9,
      y:0
    });
    schools[i].display();

  }
 
    

  }
  else{
    var school1 = new School(width,height-60,170,170,-60);
    schools.push(school1)
  }
}

function collisionWithGirl(){
  for( var i = 0; i< schools.length; i++){
    if(schools[i] !==undefined){
      var collision = Matter.SAT.collides(girl.body,schools[i].body);

      if (collision.collided){
        console.log("game over")
      }
    }
  }
}

