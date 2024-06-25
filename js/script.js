/* Used to target the unordered list where player's guessed letters will appear */
const guessedLetters = document.querySelector(".guessed-letters");
/* Used to target the HTML button element with the word "Guess!" in it */
const guessButton = document.querySelector(".guess");
/* Used to target the text input HTML element, where players will guess a letter */
const letterInput = document.querySelector(".letter");
/* Used to target the HTML paragraph element, where the word in progress will appear */
const guessInProgress = document.querySelector(".word-in-progress");
/* Used to target the HTML paragraph element, where the remaining guesses will display */
const remainingGuesses = document.querySelector(".remaining");
/* Used to target the HTML span element inside the paragraph element where the remaining guesses will display */
const spanRemainingGuesses = document.querySelector(".remaining span");
/* Used to target the HTML paragraph element where player messages will appear when a letter is guessed */
const messageForGuesses = document.querySelector(".message");
/* Used to target the hidden play again button HTML element */
const playAgainButton = document.querySelector(".play-again hide");

let word = "magnolia"; /* Initial Guess game word to start game AND since its value will need to be changed/reassigned, this variable needed to be a "let" instead of "const" */

const letterGuesses = []; /* Variable to represent the letters guessed by the player in the form of an array; different than the 'guessedLetters" variable */

/* Variable to display the player's number of guesses left/remaining */
let guessesLeft = 8; /* Used "let" insteaed of "const" since the guessLeft value will change depeding on if the correct letter is guessed or not via the "countGuesses" function */

const getword = async function(){
    const wordRequest = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await wordRequest.text();
    console.log(data);

    const newWordArray = data.split("\n");
    console.log(newWordArray);

    const randomWordIndex = Math.floor(Math.random() * newWordArray.length);
    const randomWord = newWordArray[randomWordIndex];
    console.log(randomWord);

    const newWord = randomWord.trim();
    word = newWord;

    placeholders(newWord);
};

getword();


/* Writing a function to add placehodlers in place of letters for words being guessed */
const placeholders = function (word){
    const words = []; 
    for (let letters of word){ 
        console.log(letters);
        words.push("●");         
    }
    guessInProgress.innerText = words.join("");
};

getword();

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
    } else if (!input.match(acceptedLetter)){ /* Using the "!" in front of "input.match(acceptedLetter" means that the following code is TRUE if the input value is NOT a letter, thus trigging the code underneath it. If the input value is a letter, the conditional statement is FALSE and code moves on to the next conditional statement block */
        messageForGuesses.innerText = "Please guess using letters only, from A to Z";
        console.log("Please guess using letters only from A to Z");
    } else {
        return input;
    }
};

/* Function used to capture the input (letter in this instance) that is guessed */
const makeGuess = function (letter){
    letter = letter.toUpperCase(); /* Used to convert letter parameter from lowercase to uppercase */
    if (letterGuesses.includes(letter)){ /* Use the .includes() method to check if code includes a particular letter or string - In this instance, checking letterGuess array for inputed guessed letter i.e. the letter parameter (which will register letters guessed by the player after each guess ) */
        messageForGuesses.innerText = "You've already guessed that letter, please try again.";
        console.log("Already guessed this letter, please try again");
    } else {
        letterGuesses.push(letter); /* Adds the letter guessed to the letterGuess array */
        playerGuesses(); /* Used to update the "guessedLetters" unordered list by adding newly created list items (li) to the unordered list every time a letter is guessed */
        countGuesses(letter); /* Used to update the remaining number of guesses the player has */
        updateWord(letterGuesses); /* Used to update the letters of the word being guessed (if the letter matches a letter in the word being guessed) so they display if correctly guessed */
        console.log(letterGuesses);
    }
};

/* Function to get input (letters guessed) to show up on game when guessed */
const playerGuesses = function(){
    guessedLetters.innerHTML = ""; /* Emptying the HTML in this instance is crucial to ensure that the HTML targeting the unordered list for the guessedLetters array is cleared/emptied after each letter is guessed and before each newly created list item (created by the guessed letter) added/appended to the guessedLetters array/ unordered list HTML (essentially providing a clean slate to display only the current set of guessed letters */
    letterGuesses.forEach(function (letter, letterGuesses){ /* "letter" and "letterGuesses" are used as a placed holder value */
        let listItem = document.createElement("li");
        listItem.textContent = letter; /* Using .textContent will help display what content will be displayed within each newly created list item. In this instance, using .textContent helps ensure that the text displayed in the list item corresponds to the letter from the array that it represents. */
        guessedLetters.append(listItem);
    })
};


/* Function used to update the word in progressed (being guessed) that accepts the "letterGuesses" array as a parameter -> Will update the dots with letters, when guessed correctly, if thay are a match for the word being guessed */
const updateWord = function (letterGuesses){
    const wordUpper = word.toUpperCase(); 
    const wordArray = wordUpper.split(""); 
    console.log(wordArray);
    const newArray = []; 
    for (let letter of wordArray){ 
        if (letterGuesses.includes(letter)){ 
            newArray.push(letter.toUpperCase()); 
        } else {
            newArray.push("●");
        }
    }
    guessInProgress.innerText = newArray.join(""); 

    gameWon(wordUpper); /* Used "wordUpper" as a parameter when calling the function, to carry over the vaule from the "gameWon" function after passing the "wordUpper" variable as an arguement/value in the "gameWon" function, which will allow the function to access the data from the updateWord function since the updateWord function and gameWon function aren't in the same scope */

};

/* Function to count the remaining guesses */
const countGuesses =  function (input){
    const upperWord = word.toUpperCase();
    if (upperWord.includes(input)){
        messageForGuesses.innerText = "You're correct, that letter is in the word!";
        console.log("Letter guessed is contained in the mystery word");
    } else {
        messageForGuesses.innerText = "Sorry, letter guessed isn't part of the mystery word";
        guessesLeft -= 1; /* Uses a Compound Assignment Operators via ( -=) */
        console.log("Guess letter is not contained in the mystery word");
    }

    if (guessesLeft === 0){
        messageForGuesses.innerText = "Sorry, but you are out of guesses. Please try playing again!";
        spanRemainingGuesses.innerText = `You have ${guessesLeft} remaining!`; /* Used template Literal and ${} placeholder to access the "guessLeft" value and incorporate it into my temp literal */
        console.log("Player has 0 guesses left");
    } else if (guessesLeft === 1){
        spanRemainingGuesses.innerText = `You have ${guessesLeft} remaining`;
        console.log("Player has 1 guess left");
    } else {
        spanRemainingGuesses.innerText = `You have have ${guessesLeft}.`;
    }
};

/* Function to check if the player has won the game */
const gameWon = function (wordUpper){ /* Using wordUpper as a parameter, I can use the value of "wordUpper" from my updateWord function for my gameWon function -> this helps define "wordUpper" when used in the conditional statement (wordUpper === guessInProgress.innerText) */
   if (wordUpper === guessInProgress.innerText){ 
        messageForGuesses.classList.add("win"); 
        messageForGuesses.innerHTML = '<p class="highlight"> You guessed the correct word! Congrats! </p>';
        console.log("Congrats! You've won this game!");
    } else {
        console.log("Keep guessing, you haven't won yet!")
    } 
};



