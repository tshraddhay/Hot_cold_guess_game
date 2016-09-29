
$(document).ready(function(){
	

	'use strict';
	var guessedNumber, userGuess, count, pastGuesses = [], userFeedback,
alreadyGuessed, guessHtml, input, feedback,
countElement,
guessList, newButton,
form;


	$(document).ready(pageLoad);

	function pageLoad(){

	

  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	newButton = $('a.new');
  	form = $('form');
  	input = form.find('#userGuess');
  	feedback = $('#feedback');
  	countElement = $('#count');
  	guessList = $('#guessList');
 		
	 		newGame();

	 		form.submit(function(event){
	      event.preventDefault();
	      getUserGuess();
	    });
	    newButton.click(newGame);
	}

	function newGame(){
	form.find('input[type=submit]').css('opacity','1');
	resetVariables();
	render();
	secretNumber();
}

	
	function getUserGuess(){
		userGuess = input.val();
		input.val('');
		input.focus();
		
		if(checkGuess()){
			return ;
		}
		
		compareValues();
		trackGuess();
		guessCount();
		render();
	}

  	function checkGuess(){
  		if(userGuess % 1 !== 0){
  			alert('please input a number');
  			return true;
  		}
  		if(userGuess < 0 || userGuess > 101){
  			alert('please choose a number between zero and 100');
  			return true;
  		}
  		if(pastGuesses.length > 0){
			$.each(pastGuesses,function(guess,value){
				if(userGuess == value){
					alreadyGuessed = true;
				}
			}); 
		}
		if(alreadyGuessed){
			alreadyGuessed = false;
			alert('You guessed this number already');
			return true;
		}
    return false;
	}

  	

  	function compareValues(){
		if(guessedNumber == userGuess){
			winner();
		}
			else if(Math.abs(guessedNumber - userGuess) < 10){
				userFeedback='hot';
			}
				else if(Math.abs(guessedNumber - userGuess) < 20 && Math.abs(guessedNumber -userGuess) > 9){
					userFeedback= 'Kinda hot';
				}
					else if(Math.abs(guessedNumber - userGuess) < 30 && Math.abs(guessedNumber -userGuess) > 19){
						userFeedback= 'less than warm';
					}
						else  {
							userFeedback ='cold';
						}
	}

	function trackGuess(){
	pastGuesses.push(userGuess);
	guessHtml = '';
		if(pastGuesses[0].length) {
		$.each(pastGuesses,function(guess,value){
			guessHtml += '<li>' + value + '</li>';
			});
		}
	}

	function guessCount(){
		count++;
	}

	function render(){
	guessList.html(guessHtml);
	countElement.html(count);
	feedback.html(userFeedback);
	}
	
	function winner(){
		userFeedback = "You have won. Click 'New Game' continue for a new game";
		form.find('input[type=submit]').css('opacity','0');
	}

	function secretNumber(){
		guessedNumber = Math.floor((Math.random() * 100) + 1);
	}



function resetVariables(){
	count = 0;
	pastGuesses = [];
	guessHtml='';
	userGuess = '';
	userFeedback = 'Make your Guess!';
}

});

  	


