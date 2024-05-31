/* Used to target the unordered list where player's guessed letters will appear */
const guessedLetters = document.querySelector(".guessed-letters");
/* Used to target the HTML button element with the word "Guess!" in it */
const guessButton = document.querySelector(".guess");
/* Used to target the text input HTML element, where players will enter their guesses into */
const letterInput = document.querySelector(".letter");
/* Used to target the HTML paragraph element, where the word being guessed in progressed will appear */
const guessInProgress = document.querySelector(".word-in-progress");
/* Used to target the HTML paragraph element, where the remaining guesses will appear */
const remainingGuesses = document.querySelector(".remaining");
/* Used to target the HTML span element inside the paragraph element where the remaining guesses will appear */
const spanRemainingGuesses = document.querySelector(".remaining span");
/* Used to target the HTML paragraph element where player messages will appear when a letter is guessed */
const messageForGuesses = document.querySelector(".message");
/* Used to target the hidden play again button HTML element */
const playAgainButton = document.querySelector(".play-again hide");

const word = "magnolia";

const placeholders = function (word){
    const words = [];
    for (let letters of word){
        console.log(letters);
        words.push("●");         
    }
    guessInProgress.innerText = words.join("");
};

placeholders(word);

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    const input = letterInput.value;
    console.log(input);
    letterInput.value = "";
});