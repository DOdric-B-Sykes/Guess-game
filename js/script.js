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

const word = "magnolia"; /* Initial Guess game word to start game */

const letterGuesses = []; /* Variable to represent the letters guessed by the player in the form of an array; different than the 'guessedLetters" variable */

/* Writing a function to add placehodlers in place of letters for words being guessed */
const placeholders = function (word){
    const words = []; 
    for (let letters of word){ 
        console.log(letters);
        words.push("●");         
    }
    guessInProgress.innerText = words.join("");
};

placeholders(word);

/* Adds an event listener to target the "Guess button" and accept text input for guessing letters */
guessButton.addEventListener("click", function(e){
    e.preventDefault();
    const input = letterInput.value;
    console.log(input);
    letterInput.value = "";
    messageForGuesses.innerText = "";
     const result = validateInput(input);

    if (result){
    makeGuess(input);
    }
});

/* Function's purpose is to validate the player's input */
const validateInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input === ""){ /* Checks if input field is an empty string or "blank/empty" */
        messageForGuesses.innerText = "Please guess a letter";
        console.log("Please guess a letter");
    } else if (input.length > 1){
        messageForGuesses.innerText = "Please enter only 1 letter at a time";
        console.log("Please enter only one letter at a time when guessing");
    } else if (!input.match(acceptedLetter)){ /* Using the "!" in front of "input.match(acceptedLetter" NEGATES the result of the following expression, meaning if the "input" value matches the "acceptedLetter" variable (meaning its a letter via the [/a-zA-Z/] regular expression), the conditional statement rings true and triggers the following code underneath the conditional statement. */
        messageForGuesses.innerText = "Please guess using letters only, from A to Z";
        console.log("Please guess using letters only from A to Z");
    } else {
        return input;
    }
};

const makeGuess = function (letter){
    letter = letter.toUpperCase(); /* Used to convert letter parameter form lowercase to uppercase */
    if (letterGuesses.includes(letter)){ /* Use the .includes() method to check if code includes a particular letter or string - In this instance, checking letterGuess array for inputed guessed letter i.e. the letter parameter (which will register letters guessed by the player after each guess ) */
        messageForGuesses.innerText = "You've already guessed that letter, please try again.";
        console.log("Already guessed this letter, please try again");
    } else {
        letterGuesses.push(letter); /* Adds the letter guessed to the letterGuess array */
        console.log(letterGuesses);
    }
};
