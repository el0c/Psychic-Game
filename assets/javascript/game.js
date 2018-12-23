// ---------------------------------------------------------
// |   				      Global Vars			    	   |
// ---------------------------------------------------------

let winCount = 0, lossCount = 0;

let answer;
let code_guess_array, guesses_string, triesRemaining;

// ---------------------------------------------------------
// |   		      Start New Game On Page Load			   |
// ---------------------------------------------------------

function newGame() {
    //Random Alphanumeric Character Generation:
    answer = Math.random().toString(36).substr(2, 1)

    //Reset Background/Spacebar listener
    $('body').css('background-color', 'blue');

    //Display code in hint section
    $("#answer").text(answer);

    //Reset Vars
    code_guess_array = [];
    guesses_string = "";
    triesRemaining = 5;

    //Display Variables
    $('h1').text("Single Digit Code Breaker!")
    $("#guessList").text(guesses_string);
    $("#winCount").text(winCount);
    $("#lossCount").text(lossCount);
    $("#triesRemaining").text(triesRemaining);

// ---------------------------------------------------------
// |   		              User Input                	   |
// ---------------------------------------------------------
    $(document).on("keypress", event => {
        //Which key was pressed?
        const userGuess = String.fromCharCode(event.which).toLowerCase();
    
        var inp = String.fromCharCode(event.keyCode);
        if (/[a-zA-Z0-9-_]/.test(inp)) {
            if (!code_guess_array.includes(userGuess)) {
                triesRemaining--;
                $("#triesRemaining").text(triesRemaining);
                code_guess_array.push(userGuess);
                guesses_string += userGuess;
                $("#guessList").text(guesses_string);
            }
            if (userGuess === answer) {
                winCount++;
                newGame();
            } else if (triesRemaining === 0) {
                $('body').css('background-color', 'red');
                $('h1').text("Game Over: Press Space to restart")
                lossCount++;
                $(document).off("keypress");
                $(document).on('keypress', function(e) {
                    if (e.which === 32) {
                        $(document).off("keypress");
                        newGame();
                    }
                });
            }              
        }
    });
}

$(document).ready(function() {
   newGame();
}); 