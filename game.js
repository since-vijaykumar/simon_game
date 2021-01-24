// $("h1").css("color", "red");

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isGameStarted = false;
var level = 0;

$(document).on("keypress", function() {
  if (!isGameStarted) {
    isGameStarted = true;
    nextSequence();
  }
});

$(".btn").click(function(event) {

  var userChosenColour = $(this).attr("id");
  // alert(userChosenColour);
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playAll(0, gamePattern);
  $("#level-title").text("Level " + level);
  level++;
}

function playAll(index, gamePatternObject) {

  if (index < gamePatternObject.length) {
    setTimeout(function() {

      var color = gamePatternObject[index]

      $("#" + color).fadeIn(50).animate({
        opacity: .5
      }, 10).fadeOut(50).fadeIn(50).animate({
        opacity: 1
      }, 10);

      playSound(color);
      playAll(index + 1, gamePatternObject);
    }, 500);
  }
}

function playSound(name) {
  var playFile = "sounds/" + name + ".mp3";
  var audio = new Audio(playFile);
  audio.play();
}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("Success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    // console.log("Wrong");
    new Audio("sounds/wrong.mp3").play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  isGameStarted = false;
  gamePattern = [];
  userClickedPattern = []
}
