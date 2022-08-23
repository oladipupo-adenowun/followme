var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    userClickedPattern = [];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    level += 1;
    updateLevel();
}

function playAudio(name){
    var audio = new Audio(name);
    audio.play();
}

$("div.btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playAudio("sounds/"+userChosenColour+".mp3");
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function updateLevel(){
    $("#level-title").text("Level "+level);
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = false;

}

function checkAnswer(answerIndex){
    if(gamePattern[answerIndex] === userClickedPattern[answerIndex]){
        // console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        // console.log("wrong");
        playAudio("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
// Game Start
$(document).keydown(function(){
    if (!gameStarted){
        updateLevel();
        gameStarted = true;
        nextSequence();
    }
});