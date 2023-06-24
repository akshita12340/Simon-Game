var allColours = ["green","red","blue","yellow"];
var gamePattern=[];
var usersPattern=[];

var start=true;
var Level=0;
$("body").keypress(function(){
      if(start){
        $("#level-title").text("Level "+Level);
        nextSequence();
        start=false;
      }
});


$(".btn").click(function(){

    var userChosenColour=$(this).attr("id");
    usersPattern.push(userChosenColour);

    playSound(userChosenColour);
    $("#"+userChosenColour).addClass("pressed");
    setTimeout(function(){
        $("#"+userChosenColour).removeClass("pressed");
    },100);

    checkInput(usersPattern.length-1);
});

function checkInput(currentColour){
    if(gamePattern[currentColour]===usersPattern[currentColour]){
        // alert("working");
        if(gamePattern.length===usersPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        //alert(wrong Input);
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

    $("#level-title").text("Game Over,Press any key to restart.");
    startOver();
    }
}

function startOver(){

     start=true;
     Level=0;
     gamePattern=[];
}

function nextSequence(){
    usersPattern=[];
    Level++;
    $("#level-title").text("Level "+Level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=allColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

}

function playSound(colour){

    var audio=new Audio("sounds/"+colour+".mp3");
    audio.play();
}