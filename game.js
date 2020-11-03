var correctPattern = []
var userClickedPattern = []
var buttonColors = ["green", "red", "yellow", "blue"]
var level = 0

$(".btn").click(function() {
  if (level != 0) {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  }

})

$(document).keypress(function() {
  if (level === 0) {
    level = 1;
    nextSequence()
  }
})

function nextSequence() {

  userClickedPattern = []

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  correctPattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(150).fadeIn(150);
  playSound(randomChosenColor)
  $("h1").text("level " + level)
  level++

}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === correctPattern[currentLevel]) {
    if(userClickedPattern.length === correctPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver()
  }

}

function gameOver() {
  playSound("wrong")
  $("body").addClass("game-over")
  setTimeout(function() {
    $("body").removeClass("game-over")
  }, 200);
  $("h1").text("Game Over, Press Any Key to Restart")
  level = 0
  correctPattern = []
  userClickedPattern = []
}
