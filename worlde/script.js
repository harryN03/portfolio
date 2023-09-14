import {WORDS} from "./words.js"

let currentRow = 1;
let row = document.getElementById("row" + currentRow)
const SOLUTION = WORDS[Math.floor(Math.random()*(WORDS.length))].toUpperCase();
console.log(SOLUTION)
const letterPattern = /^[a-zA-Z]$/
document.addEventListener("keydown", (e) => {
    let key = e.key.toUpperCase();
    console.log("You press: " + key);
    if (letterPattern.test(key) && row.dataset.letters.length<5) {
        updateLetter(key);
    }
    else if (key==="BACKSPACE" && (row.dataset.letters.length>=1)) {       
        deleteLetter(); 
    }
    else if (key === "ENTER") {
        submit();
    }
})

document.getElementById("keyboard").addEventListener("click", (e) => {
    let pattern = /^[A-Z]$/
    let target = e.target;

    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent;
    console.log(key)
    if (key == "Del" && (row.dataset.letters.length>=1)) {
        deleteLetter();
    }
    else if (key =="Enter") {
        submit();
    }
    else if (row.dataset.letters.length<5 && pattern.test(key)) {
        updateLetter(key);
    }
})

const updateLetter = (letter) => {
    let oldLetters = row.dataset.letters;
    let newLetters = oldLetters + letter;
    row.dataset.letters = newLetters;
    let currentTile = newLetters.length;
    updateBoard(currentTile, letter)
}

const updateBoard = (currentTile, letter) =>{
    console.log("update board " + currentTile +" " + letter)
    document.querySelector("#row"+currentRow + "guess"+currentTile).innerHTML = letter.toUpperCase();
    document.querySelector("#row"+currentRow + "guess"+currentTile).classList.add("has-letter");
}

const deleteLetter = () => {
    let oldLetters = row.dataset.letters;
    let newLetters = oldLetters.slice(0,-1);
    row.dataset.letters = newLetters;
    console.log(newLetters);
    deleteFromBoard(oldLetters.length)
}

const deleteFromBoard = (currentTile) => {
    document.querySelector("#row"+currentRow + "guess"+currentTile).innerHTML = "";
    document.querySelector("#row"+currentRow + "guess"+currentTile).classList.remove("has-letter");
}

const submit = () => {
    let letters = row.dataset.letters;
    if (letters.length < 5) {
        document.querySelector("#alert").classList.add("open-pop-up");
        document.querySelector("body").classList.add("body-win");
    }
    else if (letters.length ===5) {
        for (let i =0;i<5;i++) {
            setTimeout (() => {
                revealResult(i, checkLetter(i))
            }, 200*i)
        }
    }

    if (currentRow==6 && (!checkWin())) {
        document.querySelector("#lose-pop-up").classList.add("open-pop-up");
        document.querySelector("#solution").innerHTML = "The solution is: " + SOLUTION;
    }
}

const checkLetter = (pos) => {
    const letters = row.dataset.letters;
    if (letters[pos] === SOLUTION[pos]) {
        document.querySelector("#"+letters[pos]).classList.add("correct")
        return "correct"
    }
    else if (SOLUTION.includes(letters[pos])){
        document.querySelector("#"+letters[pos]).classList.add("present")
        return "present"
    }
    else {
        document.querySelector("#"+letters[pos]).classList.add("absent")
        return "absent"
    }

}

const revealResult = (i , status) => {
    let guess = i+1;
    let elem = document.querySelector("#row"+currentRow+"guess"+guess);
    if (status ==="correct") {
        elem.classList.add("correct");
    }
    else if (status ==="present") {
        elem.classList.add("present")
    }
    else if (status ==="absent") {
        elem.classList.add("absent")
    }
    if (i==4) {   //if i ==4; then the guess is completed
        checkWin();
    }
}

const checkWin = () => {
    if (row.dataset.letters.toUpperCase() === SOLUTION) {
        document.querySelector("#win-pop-up").classList.add("open-pop-up")
        document.querySelector("body").classList.add("body-win");
        return true;
    }
    else {
        currentRow +=1;
        row = document.getElementById("row" + currentRow);
        return false
    }

}

// let playAgainButton = document.getElementById("play-again");
// playAgainButton.onclick = function() {
//     location.reload();
// }

// let tryAgainButton = document.getElementById("try-again");
// tryAgainButton.onclick = function() {
//     location.reload();
// }

let buttons = document.getElementsByClassName("play-again");
for (let i=0; i<buttons.length;i++) {
    let button = buttons[i];
    button.onclick = function() {
        location.reload();
    }
}

let closeButton = document.getElementById("close");
closeButton.onclick = function() {
    document.querySelector("#win-pop-up").classList.remove("open-pop-up")
    document.querySelector("body").classList.remove("body-win");
    document.querySelector(".playAgain").classList.add("show-playAgain");
    }

let closeAlert = document.getElementById("close-alert");
closeAlert.onclick = function() {
    document.querySelector("#alert").classList.remove("open-pop-up")
    document.querySelector("body").classList.remove("body-win");
    }


