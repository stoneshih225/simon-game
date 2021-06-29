let buttonColours = ["red", "blue", "green", "yellow"]; //color
let gamePattern = []; //push color
let userClickedPattern = []; //user chosen color
let started = false; //control start
let level = 0; //start at level o

//Sequence
function nextSequence () {
    let randomNumber = Math.floor(Math.random() * 4); //random number
    let randomChosenColour = buttonColours[randomNumber]; //get random color

    gamePattern.push(randomChosenColour); //push color
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //button flash animate
    playSound(randomChosenColour); //call playsound function
    
    level++; //level up
    $("#level-title").text("Level " + level); //update h1 level

    userClickedPattern = []; //reset userClickPattern
}
//Sequence


//play sound
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3"); //play sound
    audio.play(); //play sound
}
//play sound


//animate
function animatePress (currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
//animate


//checkAnswer
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
//checkAnswer


//restart the game
function startOver () {
    started = false;
    level = 0;
    gamePattern = [];
}
//restart the game


//handleClick
$(".btn").on("click", function () {
    let userChosenColour = $(this).attr("id"); //user chosen color
    userClickedPattern.push(userChosenColour); //push user chosen color
    playSound(userChosenColour); //call playsound function
    animatePress(userChosenColour); //call animate
    checkAnswer(userClickedPattern.length - 1); //user's answer length
});
//handleClick


//handleKeyboard
$(document).on("keydown", function (event) {
    if (started === false) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
})
//handleKeyboard