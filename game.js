var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var startGame = 0;

var touchTimes = 0;

var level = 0;

// Configuring h1 regarding device size

var viewPortWidth = $(window).width();

if ( viewPortWidth <= 768 ) {
	$("h1").text("Touch here to start")
};

// Start the game by prees any key

$(document).keydown(function(){

	if(startGame === 0){
		
		nextSequence();
	}

	startGame++;
		
});

// Start the game by tapping h1 area

$("h1").on({"touchstart" : function(){

	if(touchTimes === 0){
		
		nextSequence();
	}

	touchTimes++;

}});

// Generating next sequence

function nextSequence(){

  	randomNumber = Math.floor(Math.random () * 4);

  	var randomChosenColour = buttonColours[randomNumber];

	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour).fadeOut(100).fadeIn(100);

	playSound(randomChosenColour);

	level++;

	$("h1").text("Level " + level);

	userClickedPattern = [];

}


// Button clicked by user


$(".btn").click(function(event){
	
	var userChosenColour = $(event.target).attr("id");
	
	userClickedPattern.push(userChosenColour);
	
	playSound(userChosenColour);
	
	animatePress(userChosenColour);

	var userSelect = userClickedPattern[userClickedPattern.length-1];

	scanMatch(userSelect);

});

//Scaning for matches

function scanMatch(currentLevel){

	var gameSquence = gamePattern[userClickedPattern.length-1];

	if (currentLevel === gameSquence) {

		if (userClickedPattern.length === gamePattern.length) {

			setTimeout(function(){
			nextSequence();
			}, 1000);
			
		};
		
	} else{

		wrongAlert();
		startOver();
	};
	
};
	
	
// Play Sound function

function playSound(name){

	var buttonAudio = new Audio("sounds/" + name + ".mp3");
 	buttonAudio.play();

}

// Animation function 

function animatePress(currentColour){
	$("#" + currentColour).addClass("pressed")

	setTimeout(function(){
		$("#" + currentColour).removeClass("pressed");
		
	}, 100);
}

// Wrong alert function

function wrongAlert(){

	if ( viewPortWidth <= 768 ) {
		$("h1").text("Game Over, Touch here to restart");
	} else{
		$("h1").text("Game Over, Press any key to restart");
	};

	$("body").addClass("game-over");

	var wrongAudio = new Audio("sounds/wrong.mp3");

	wrongAudio.play();

	setTimeout(function(){
		$("body").removeClass("game-over");
		
	}, 200);

}

//Reset function

function startOver(){

	userClickedPattern = [];

	gamePattern = [];

	startGame = 0;

	touchTimes = 0;

	level = 0;

	viewPortWidth = 0;
}






