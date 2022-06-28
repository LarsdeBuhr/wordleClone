//Array of words
const listOfWords = [
   "apfel",
   "pizza",
   "blume",
   "blond",
   "blitz",
   "curry",
   "eisen",
   "hilfe",
   "segel",
   "seele",
   "zucht",
];

//Random pick of word from word list
let word = listOfWords[Math.floor(Math.random() * listOfWords.length)];
console.log(word);

//Array of letters which represents one guessed word
let guessedWords = [[]];
let availableSpace = 1;
let guessedWordCount = 0;

//all keys of keayboard shown on screen
const keys = [...document.querySelectorAll(".keyboard-row button")];

//start new game button
document.querySelector("#newGame button").addEventListener("click", startNewGame);

//Create the gameBoard for words with 5 letters and 6 tries
function createSquares() {
   const gameBoard = document.querySelector("#board");

   for (let index = 0; index < 30; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("animate__animated");
      square.setAttribute("id", index + 1);
      gameBoard.appendChild(square);
   }
   document.getElementById(String(availableSpace)).classList.add("white")
}

//color of tile
function getTileColor(letter, index) {
   //if there ist no match at any position
   //Color: grey
   if (!word.includes(letter)) {
      return "rgb(58,58,60)";
   }

   //If there is a match at the right position
   //Color: Green
   if (letter === word.charAt(index)) {
      return "rgb(83,141,78)";
   }

   //Color: yellow
   return "rgb(181,159,59)";
}

//Start a new game
function startNewGame() {
   [...document.querySelectorAll(".square")].map((e) =>
      e.remove()
   );
   createSquares();
   guessedWords = [[]];
   availableSpace = 1;
   guessedWordCount = 0;
   document.location.reload();
   word = listOfWords[Math.floor(Math.random() * listOfWords.length)];
   document.querySelector("#userInfo").classList.add("hidden");
   
}

//Check submitted word
function handleSubmitWord() {
   const currentWordArray = getCurrentWordArray();
   const currentWord = getCurrentWordArray().join("");
   const firstLetterId = guessedWordCount * 5 + 1;
   const interval = 200;

   //If all 5 letters are filled up and you are still in the game
   if (guessedWords.length < 7 && currentWordArray.length == 5) {
      currentWordArray.forEach((letter, index) => {
         setTimeout(() => {
            const tileColor = getTileColor(letter, index);
            const letterId = firstLetterId + index;
            const letterEl = document.getElementById(letterId);
            letterEl.classList.add("animate__flipInX");
            letterEl.style = `background-color:${tileColor}; border-color:${tileColor}`;
            
         }, interval * index);
      });

      guessedWordCount += 1;
      guessedWords.push([]);

      //Winning conditions
      if (currentWord === word) {
         console.log(currentWord);
         const userInfo = document.querySelector("#userInfo");
         userInfo.textContent = "You win!";
         userInfo.classList.remove("hiddenElement");
         
         //Loosing conditions
      } else if (guessedWords.length == 7) {
         const userInfo = document.querySelector("#userInfo");
         userInfo.textContent = "You loose. Word is" + `"${word.charAt(0).toUpperCase()+ word.slice(1)}"`      
         userInfo.classList.remove("hiddenElement");
      }

      //Alert if the word is too short
   } else if (currentWordArray.length < 5) {
         const userInfo = document.querySelector("#userInfo");
         userInfo.textContent = "Word must be 5 letters";      
         userInfo.classList.remove("hiddenElement");
   }
}

//Delete the last letter
function handleDeleteLetter() {
   const currentWordArray = getCurrentWordArray();
   if(availableSpace > 1 && currentWordArray.length > 0){
      guessedWords[guessedWords.length - 1].pop();
      

   const lastLetterElement = document.getElementById(
      String(availableSpace - 1)
   );

   lastLetterElement.textContent = "";
   
   availableSpace = availableSpace - 1;
   }
}

//each key gets an click event listener
keys.map((element) => {
   element.addEventListener("click", () => {
      const key = element.getAttribute("data-key");

      if (key === "enter") {
         handleSubmitWord();
         document.getElementById(String(availableSpace)).classList.add("white")
         return;
      }

      if (key === "del") {
         document.getElementById(String(availableSpace)).classList.remove("white")
         handleDeleteLetter();
         document.getElementById(String(availableSpace)).classList.add("white")
         console.log(guessedWords);
         return;
      }

      updateGuessedWords(key);
      console.log(guessedWords);
   });
});

//get the current guessed word array
function getCurrentWordArray() {
   return guessedWords[guessedWords.length - 1];
}

//Update guessed word array
function updateGuessedWords(letter) {
   document.getElementById(String(availableSpace)).classList.remove("white")
   
   document.querySelector("#userInfo").classList.add("hiddenElement");
   const currentWordArray = getCurrentWordArray();
   if (currentWordArray && currentWordArray.length < 5) {
      currentWordArray.push(letter);
      const availableSpaceElement = document.getElementById(
         String(availableSpace)
         );
         availableSpace = availableSpace + 1;
         if(getCurrentWordArray().length < 5){
         document.getElementById(String(availableSpace)).classList.add("white")
         }
         availableSpaceElement.textContent = letter;
   }
}

createSquares();

