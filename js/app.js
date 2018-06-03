// Variables
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const win = document.getElementById('win');
const lose = document.getElementById('lose');
let missed = 0;
const startButton = document.getElementsByClassName('btn__reset')[0];
let phrases = [
  "A BIRD IN THE HAND IS WORTH TWO IN THE BUSH",
]
/*
"A BARKING DOG NEVER BITES",
"A GOLDEN KEY CAN OPEN ANY DOOR",
"BETTER LATE THAN NEVER",
"YOU CANNOT JUDGE A BOOK BY ITS COVER",
*/

//Hide start screen --> START Game
startButton.addEventListener("click", hideFunction);

function hideFunction() {
  overlay.style.display = 'none';
}

//show function for win or lose
function showFunction(){
  overlay.style.display = 'block';
}

//Get random phrase and transform to letters array
function getRandomPhraseAsArray(arr){
  //get random array
  var rand = arr[Math.floor(Math.random() * arr.length)];
  //make the array phrase into an array of letters
  var index = 0;
  var arrayLength = rand.length;
  var tempArray = [];
  for (index = 0; index < arrayLength; index += 1) {
      myChunk = rand.slice(index, index+1);
      tempArray.push(myChunk);
  }
  return(tempArray);
}

console.log(getRandomPhraseAsArray(phrases));
const phraseArray = getRandomPhraseAsArray(phrases);

//Add phrase to display
function addPhraseToDisplay(arr){
  //loop through an array of characters
  for (i = 0; i < arr.length; i++){
    const tempArray = arr[i];
    //create a list item for each
    const list = document.createElement('LI');
    const text = document.createTextNode(tempArray);
    list.appendChild(text);
    //append li to #phrase ul
    const phrase = document.getElementById("phrase").appendChild(list);
    //add class letter if not space
    if (tempArray ===" "){
      phrase.className = 'space';
    } else {
      phrase.className = 'letter';
    }
  };
}

addPhraseToDisplay(phraseArray);

//checkletter
function checkLetter(guess){
  let letter = document.getElementsByClassName('letter');
  let wrong = 0;
  //loop to see if the guess match an existing letter
  for (i = 0; i < letter.length; i++){
    let text = letter[i].innerText;
    if (guess == text || guess.toUpperCase() == text){
     //let show = document.getElementsByClassName('letter')[i];
     letter[i].className = 'show';
     let show = document.getElementsByClassName('show');
       if (letter.length == show.length){
         win.style.display = 'flex';
       }
    } else {
     wrong = wrong + 1;
     if (wrong == letter.length){
       missed = missed + 1;
       //change liveHeart.png for lostHeart.png
       var images = document.getElementsByTagName("img");
       document.images[missed - 1].src="images/lostHeart.png";
       if (missed == '5'){
         lose.style.display = 'flex';
       }
     }
    }
  }
}

//listen to all guess clicks
document.getElementById("qwerty").addEventListener("click", function(e) {
	// e.target is the clicked element!
	// If it was a button item
	if(e.target && e.target.nodeName == "BUTTON") {
    e.target.className = 'chosen';
    e.target.disabled = true;
    let letterSelected = e.target.textContent;
    checkLetter(letterSelected);
    /*if (false){
      missed = missed + 1;
      //change liveHeart.png for lostHeart.png
      var images = document.getElementsByTagName("img");
      document.images[missed - 1].src="images/lostHeart.png";
    }*/
	}
});


/*
//Keyboard press
document.onkeypress = function(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
    if (charCode) {
        alert("Character typed: " + String.fromCharCode(charCode));
        checkLetter(String.fromCharCode(charCode));
    }
};
*/
