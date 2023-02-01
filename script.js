//creating varibales to target areas of the DOM to work with
let guess = document.getElementById('guess');
let guessed = document.getElementById('guessed');
let timer = document.getElementById('timer');
let feedback = document.getElementById('feedback');
let leaderBoard = document.getElementById('leaderboard');
let start = document.getElementById('start');

//global varibales so that their content can be updated and 
//shared through multiple functions when necessary 
let spaces = 0;
let chosenWord = '';
let lettersInChosenWord = []
let blanks = []
let wordBank = ['superman', 'spiderman', 'batman']
let clock;

let time = 45

//handles starting the game, starts timer and gets the word to guess
function beginGame() {
    clock = setInterval(function() {
        time--;
        timer.textContent = 'Time: ' + time;
        if (time === 0) {
            clearInterval(clock)
            start.removeAttribute('class', 'none');
            start.textContent = 'Play Again?';
            timer.textContent = 'Game Over';
            time = 45;
        } 
    }, 1000)
    start.setAttribute('class', 'none');
    getWords();
}

function getWords() {
    //chooses a random word from the array called wordBank and assigns it to the chosenWord Variable
    chosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    //splits the chosenWord string into an array of indiviual letters called lettersInChosenWord
    lettersInChosenWord = chosenWord.split('');
    //gets the number of letters in the word and assigns in to the variable spaces
    spaces = lettersInChosenWord.length;

    console.log(chosenWord, lettersInChosenWord, spaces)
    //assigns the varibale blanks to an empty array
    blanks = []
    //a loop that for every letter pushes and empty spaces to the blanks array
    for (let i = 0; i < spaces; i++) {
        blanks.push('_');
    }
    //joins the blanks array into a string of spaces and puts it on the screen
    guess.textContent = blanks.join(' ');
}


//a function to check if the letters the user submitted are in the word
//takes in the letter someone chose as a parameter
function checkLetters(letter) {
    //sets a variable to boolean false 
    let lettersInWord = false;
    //a loop set to run over the word
    for (let i = 0; i < spaces; i++) {
        //if during our loop we find that an index is the same letter as what was entered then we tell 
        //the function that the letter is in the word by changin the boolean to true
        if (lettersInChosenWord[i] === letter) {
            lettersInWord = true;
        }
    }
    //if the lettersInWord boolean is true 
    if (lettersInWord) {
        //then loop over the word again and find the letter that is the same 
        for (let j = 0; j < spaces; j++) {
           if (lettersInChosenWord[j] === letter) {
               //change the matching index in the blanks array to the value of the matching letter
                blanks[j] = letter;
           }
        }
        console.log(guess)
        //after the blank space gets changed to the letter, join it back to a string and render it to the DOM again
        guess.textContent = blanks.join(' ')
    }
}

//a function to check if the game is over and the player won
function checkWin() {
    let check = blanks.join('')
    console.log(check)
    if (check === chosenWord) {
        clearInterval(clock);
        timer.textContent = '';
        start.removeAttribute('class', 'none');
        start.textContent = 'Play Again?';
        return guess.textContent = 'Congrats You Win'

    }
}

//add a keydown event listener that will process which letters are chosen and what to do with them
document.addEventListener('keydown', (event) => {
    //if the time runs out don't do anything
    if (time === 0 ) {
        return;
    }
    //this key varibale tells the function that any key pressed will be changed to lowercase
    let key = event.key.toLowerCase();
    //this varibable just contains the alphabet and numbers up to 9 as an array 
    let alphaNumericCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789 '.split('');
    //if the alphabet array contains the key that was pressed 
    if (alphaNumericCharacters.includes(key)) {
        //then we assign the key to the variable letter
        let letter = event.key;
        //the letter is then passed to the function to check if it in the word
        checkLetters(letter)
        //calls function to check if the word is complete
        checkWin();
    }
})

//When the start button is clicked the beginGame function will start the game
start.onclick = beginGame