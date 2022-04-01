var colors = ["red", "yellow", "blue", "green"];
var currSequence = []; // stores the game Patterm
var userChosenSequence = []; // stores the user Pattern
var level = 0;

function startOver(){ // resets the whole game
  level = 0;
  currSequence = [];
}

function playSound(name){
   var z = new Audio("sounds/"+name+".mp3");
   z.play();
}

function wrongEffect(){
    playSound("wrong");

  $("body").addClass("game-over");

  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);

  $("h1").html("Game Over, Press Any Key to Restart..");

  startOver(); // call to restart the game
}

function checkMatch(index){

  if(userChosenSequence[index] === currSequence[index])
  {
  //  console.log("true");
    if(userChosenSequence.length === currSequence.length){
      setTimeout(function(){
        nextSequence();
      },1000); // if user matches , then another color shown
    }
  }
  else{
  //    console.log("wrong");
      wrongEffect();
  }
}

function animatePress(colorName){
    $("#"+colorName).addClass("pressed");

    setTimeout(function(){
      $("#"+colorName).removeClass("pressed");
    }, 100);
}

function nextSequence(){

  userChosenSequence = []; // reset the user Input Sequenece

  level = level + 1;
  $("#level-title").html("Level "+level); // changing the Headng

  var randomColor = Math.ceil(Math.random() * 4) - 1; // generates number b/w [0,3]

  var n = currSequence.length;
  currSequence[n] = colors[randomColor]; // adding new random generated color to current Sequence / Pattern

  $("#"+colors[randomColor]).fadeOut(100).fadeIn(100); // flash Animation

  playSound(colors[randomColor]);
}

$(".btn").click(function(event){

    if(level === 0){
        wrongEffect();
    }
    else{
      var userChosenColor = event.target.id;
      //console.log(event.target.id);
      userChosenSequence.push(userChosenColor); // pushing into array of userChosenPatern

      animatePress(userChosenColor); // adding animation to chosen button

      playSound(userChosenColor); // playing sound on clicking button

      checkMatch(userChosenSequence.length - 1); // matches for current user clicked pattern
    }
});

$(document).keypress(function(){
  if(level === 0){
    nextSequence(); // detects a keyPress
  }
});
