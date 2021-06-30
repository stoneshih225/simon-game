# simon-game
### ✔[Live Demo](https://stoneshih225.github.io/simon-game/)
<br>

![simonGame](https://media.giphy.com/media/b7k1phuPc3dfl5ejX3/giphy.gif)

### MY NOTE 📃
```
let buttonColours = ["red", "blue", "green", "yellow"]; //color
let gamePattern = []; //push color
let userClickedPattern = []; //user chosen color
let started = false; //control start
let level = 0; //start at level o
```
<br>

nextSequence ()
```
function nextSequence () {
    let randomNumber = Math.floor(Math.random() * 4); //random number 0 ~ 3
    let randomChosenColour = buttonColours[randomNumber]; //get random color buttonColours[0 ~ 3]

    gamePattern.push(randomChosenColour); //push color
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //button flash animate
    playSound(randomChosenColour); //call playsound function
    
    level++; //level up
    $("#level-title").text("Level " + level); //update h1 level

    userClickedPattern = []; //reset userClickPattern
}
```
<br>

playSound (name)
```
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3"); //play sound
    audio.play(); //play sound
}
```
<br>

animatePress (currentColour)
```
function animatePress (currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
```
<br>

checkAnswer (currentLevel)
```
function checkAnswer (currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        
        //finish the game or not
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    } else {
        //game-over sound
        playSound("wrong");

        //game-over animate
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        //change h1 to game over
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        //restart the game
        startOver();
        
        console.log("wrong");
    }
}
```
<br>

startOver ()
```
function startOver () {
    started = false;
    level = 0;
    gamePattern = [];
}
```
<br>

handleClick
```
$(".btn").on("click", function () {
    let userChosenColour = $(this).attr("id"); //user chosen color
    userClickedPattern.push(userChosenColour); //push user chosen color
    playSound(userChosenColour); //call playsound function
    animatePress(userChosenColour); //call animate
    checkAnswer(userClickedPattern.length - 1); //user's answer length
});
```
<br>

handleKeyboard
```
$(document).on("keydown", function (event) {
    if (started === false) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
})
```
