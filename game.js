var buttonColors=["red","green","blue","yellow"];

var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

$(document).on("keypress",function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function(){

  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1)
});
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("#"+currentColor).toggleClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).toggleClass("pressed");
  },100);
}
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else {
    playSound("wrong");
    $("body").toggleClass("game-over");
    $("#level-title").text("Game Over,Press a key to restart");

    setTimeout(function(){
      $("body").toggleClass("game-over");
    },300);
    startOver();
  }
}
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.round(Math.random()*3);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}
