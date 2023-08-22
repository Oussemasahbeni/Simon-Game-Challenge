const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClicksPattern = [];
let randomChosenColor;
var level = 0;
var started = false;

$(document).keypress(() => {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClicksPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClicksPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (level < 100) {
    if (userClicksPattern[currentLevel] === gamePattern[currentLevel]) {
      if (userClicksPattern.length === gamePattern.length) {
        level < 50
          ? setTimeout(() => {
              nextSequence();
            }, 1000)
          : setTimeout(() => {
              nextSequence();
            }, 50);
      }
    } else {
      $("body").addClass("game-over");
      playSound("wrong");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
  } else {
    $("body").addClass("game-won");
    playSound("win");
    $("#level-title").text("Congratulations!, You finished the game 🏆");

    setTimeout(() => {
      $("body").removeClass("game-win");
    }, 200);
    startOver();
  }
}

function nextSequence() {
  userClicksPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  let colorSound = new Audio(`./sounds/${name}.mp3`);
  colorSound.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");

  setTimeout(() => {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
