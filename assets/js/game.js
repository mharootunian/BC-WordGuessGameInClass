//declare variables we need
let wins = 0, losses = 0, remainingGuesses, guess, chosenWord, chosenWordIndex
let lettersGuessed = [], blankedWord = [], guessIndices = []
let possibleWords = ['witch', 'cauldron', 'ghost', 'skeleton', 'pumpkin']
let alphabet = "abcdefghijklmnopqrstuvwxyz"

let winsElement = document.getElementById("wins");
let lossesElement = document.getElementById("losses");
let guessesLeftElement = document.getElementById("guessesLeft");
let blankedWordElement = document.getElementById("currentWord");
let lettersGuessedElement = document.getElementById("lettersGuessed");
let gameMenu = document.getElementById("gameMenu");
let startMenu = document.getElementById("startMenu");
let imageWinElement = document.getElementById("imageWin");

gameMenu.hidden = true;

document.onkeyup = function (event) {
    // TODO: currently, we see "Welcome, press anykey to continue". We want that to dissapear when the 
    // loop starts and replace it wih the wins, losses, guesses, etc... divs
    gameMenu.hidden = false;
    startMenu.hidden = true;
    gameLoop();
}


function gameLoop() {
    // get random word
    chosenWordIndex = Math.floor(Math.random() * possibleWords.length);
    chosenWord = possibleWords[chosenWordIndex];
    remainingGuesses = chosenWord.length * 2;

    // fill out blankedWord
    for (let i = 0; i < chosenWord.length; i++) {
        blankedWord.push("_");
    }


    blankedWordElement.innerText = blankedWord.join(" ");
    guessesLeftElement.innerText = remainingGuesses;
    winsElement.innerText = wins;
    lossesElement.innerText = losses;

    // get guess input
    document.onkeyup = function (event) {
        // make sure there are enough guesses remaining
        if (remainingGuesses > 0) {
            // if enough guesses remaining, grab what key was pressed
            guess = event.key

            console.log("Guessed letter: " + guess)

            //make sure the key pressed was a letter and not a symbol
            //if the key was not a letter...
            if (!alphabet.includes(guess)) {
                alert("twy again")
            } else {


                // check if the letter guessed was already guessed
                if (lettersGuessed.includes(guess)) {
                    alert("Already guessed that");
                } else {
                    // add the pressed key to array
                    lettersGuessed.push(guess);
                    for (let i = 0; i < chosenWord.length; i++) {
                        if (chosenWord[i] === guess) { // if chosen word has that letter in that particular element
                            blankedWord[i] = guess; // place that letter in the corresponding index in the blanked word array
                        }
                    }

                    if (!chosenWord.includes(guess)) {
                        remainingGuesses--;
                    }

                }

                if (blankedWord.join("") === chosenWord) {
                    alert("you make winnings! The word was " + chosenWord + "!");
                    wins++;
                    blankedWord = [];
                    lettersGuessed = [];
                    // TODO: add change image logic here
                    imageSelector(chosenWord);
                    gameLoop();
                }

                // TODO: update HTML elements to count for new variable values
                guessesLeftElement.innerText = remainingGuesses;
                blankedWordElement.innerText = blankedWord.join(" ");
                lettersGuessedElement.innerText = lettersGuessed;


            } // END IF LETTER GUESSED
        } else { // trigger the below if we run out of guesses
            alert("Out of guesses");
        }

    }

}

function imageSelector(word) {

    switch (word) {
        case "pumpkin":
            imageWinElement.src = "www.johnnyseeds.com%2Fvegetables%2Fpumpkins%2Fjack-o-lanterns%2Frenegade-pmr-f1-pumpkin-seed-3437.html&psig=AOvVaw1OcADtszIDdUeL7C0LQ-En&ust=1567975951052851"
            break;

        case "skeleton":
            imageWinElement.src = "https://www.sccpre.cat/mypng/detail/11-116831_halloween-skeleton-png-clip-art-imageu200b-gallery.png"
            break;

        case "witch":
            imageWinElement.src = "https://compote.slate.com/images/d7ce0d3e-cbda-4086-9281-0a31295f86e3.jpg"
            break;
            
        case "ghost":
            imageWinElement.src = "https://img.maximummedia.ie/joe_ie/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtam9lLm1heGltdW1tZWRpYS5pZS5zMy5hbWF6b25hd3MuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE5XFxcLzA3XFxcLzA0MTU1NzQwXFxcL2dob3N0LXN0b3J5LmpwZ1wiLFwid2lkdGhcIjo3NjcsXCJoZWlnaHRcIjo0MzEsXCJkZWZhdWx0XCI6XCJodHRwczpcXFwvXFxcL3d3dy5qb2UuaWVcXFwvYXNzZXRzXFxcL2ltYWdlc1xcXC9qb2VcXFwvbm8taW1hZ2UucG5nP2lkPTQzYmNhOWRlN2ViMjY5NzM3YTBmXCIsXCJvcHRpb25zXCI6W119IiwiaGFzaCI6ImIwNzc0YTc1YjRmYjE3ZDZiYTRlMjY0OTFjYmE1YmI1YmRlOTViMDgifQ==/ghost-story.jpg"
            break;

        case "cauldron":
            imageWinElement.src = "https://img.freepik.com/free-vector/halloween-vector-set_53876-40733.jpg?size=626&ext=jpg"
            break;

    }
}

