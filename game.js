var level = 0;
var life=20;
$("h2").text("Life: "+life+"💗");
var gamePattern = [];
var userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function buttonFlash(name) {
  $("#" + name)
    .fadeOut(100)
    .fadeIn(100);
}

//detect the first keyboard pressed and play level 1
$(document).keydown(function () {
  if (level == 0) {
    nextSequence();
  }
});

var randomNumber = 0;
var randomChosenColour = "red";
function nextSequence() {
//reset userClickedPattern at the beginning of the new level
  userClickedPattern = [];
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  buttonFlash(randomChosenColour);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}


//check for button clicked
function clickHandler() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
}

$(".btn").click(clickHandler);


//check the user's answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
    if (currentLevel == level-1) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    life--;
    $("h2").text("Life: "+life+"💗");
    startOver();
  }
}

//Restart the game 
function startOver(){
    level=0;
    gamePattern=[];
}


