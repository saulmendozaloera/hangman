document.querySelector("#feelingLucky").addEventListener("click", feelingLucky);
document.querySelector("#submit").addEventListener("click", answer);
document.querySelector("#playAgain").addEventListener("click", resetGame);

displayLetters();
document.getElementById("feelingLucky").disabled = true;
document.getElementById("play").disabled = true;

var hiddenMsg =""
var hiddenMsgArray = [];
var errors = 0;
var correct = 0;
var hangmanAnatomy = ["head", "body", "rightArm", "leftArm", "leftLeg", "rightLeg", "face"]

function displayLetters(){

  let topRow = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80];
  let middleRow = [65, 83, 68, 70, 71, 72, 74, 75, 76];
  let bottomRow = [90, 88, 67, 86, 66, 78, 77]

  document.querySelector("#keyboard").innerHTML = "";
  
  for(let i=0; i<topRow.length; i++){
    document.querySelector("#keyboard").innerHTML += `<button id="${String.fromCharCode(topRow[i])}" type="button" class="btn" onclick="letterChosen('${String.fromCharCode(topRow[i])}')">${String.fromCharCode(topRow[i])}</button> <span> </span>`;
  }

  document.querySelector("#keyboard").innerHTML += "<br><br>";
  
  for(let i=0; i<middleRow.length; i++){
    document.querySelector("#keyboard").innerHTML += `<button id="${String.fromCharCode(middleRow[i])}" type="button" class="btn" onclick="letterChosen('${String.fromCharCode(middleRow[i])}')"">${String.fromCharCode(middleRow[i])}</button> <span> </span>`;
  }

  document.querySelector("#keyboard").innerHTML += "<br><br>";
  
  for(let i=0; i<bottomRow.length; i++){
    document.querySelector("#keyboard").innerHTML += `<button id="${String.fromCharCode(bottomRow[i])}" type="button" class="btn" onclick="letterChosen('${String.fromCharCode(bottomRow[i])}')">${String.fromCharCode(bottomRow[i])}</button> <span> </span>`;
  }
}

function selectMessage(category){
  
  playGame();
  
  let moviesTitles = ["Titanic", "Shrek", "Jumanji", "Twilight", "Jaws", "Avatar", "Halloween", "Frozen", "Cinderella", "Grease"]
  let musicArtists = ["Beyonce", "ABBA", "Adele", "Madonna", "Nirvana", "Metallica", "Queen", "Journey"]
  let animalTypes = ["Bear", "Alligator", "Whale", "Hawk", "Giraffe", "Shark", "Penguin", "Hippo", "Zebra", "Kangaroo"]
  let sportTypes = ["Soccer", "Golf", "Basketball", "Tennis", "Rugby", "Skiing", "Swimming", "Volleyball", "Baseball"]

  

  if(category == "movies"){
    let random = Math.floor(Math.random() * moviesTitles.length);
    let movie = moviesTitles[random];
    hiddenMessage(movie);
    
  }

  if(category == "music"){
    let random = Math.floor(Math.random() * musicArtists.length);
    let music = musicArtists[random];
    hiddenMessage(music);
  }

  if(category == "animals"){
    let random = Math.floor(Math.random() * animalTypes.length);
    let animal = animalTypes[random];
    hiddenMessage(animal);
    
  }

  if(category == "sports"){
    let random = Math.floor(Math.random() * sportTypes.length);
    let sport = sportTypes[random];
    hiddenMessage(sport);
    
  }
}

function hiddenMessage(message){
  hiddenMsg = message.toUpperCase();
  hiddenMsgArray = Array.from(hiddenMsg);

  document.querySelector("#message").innerHTML = "";
  
  for(let i=0; i<hiddenMsg.length; i++){
    document.querySelector("#message").innerHTML += `<div id="${i}" class="${hiddenMsgArray[i]}"></div>`;
  }
}

function letterChosen(letter){
  let found = false;
  
  
  for(let i=0; i<hiddenMsgArray.length; i++){
    if(hiddenMsgArray[i] == letter){
      found = true;
    }
  }

  if(!found){
    wrongLetter();
  }
  else{
    correctLetter(letter);
  }

  disableButton(letter);
}

function correctLetter(letter){

  for(let i=0; i<hiddenMsgArray.length; i++){
    if(letter == hiddenMsgArray[i]){
      const match = document.querySelectorAll(`.${letter}`);
      for(let i=0; i<match.length;i++){
        match[i].innerText = letter;
      }
      ++correct;
    } 
  }

  if (correct == hiddenMsg.length){
    endGame("winner");
  }
}

function wrongLetter(){

  document.querySelector("#hangman").innerHTML = `<img src='img/${hangmanAnatomy[errors]}.png' height='400' width='451'>`;
  ++errors;

  if(errors==7){
    endGame("loser");
  }
}
function disableButton(buttonId){
  document.getElementById(buttonId).disabled = true;
}

function endGame(outcome){
  document.querySelector("#endGameMsg").className = "show";
  document.querySelector("#playAgain").className = "show";
  document.querySelector("#letters").className = "disable-letters";
  document.getElementById("feelingLucky").disabled = true;
  document.getElementById("answer").disabled = true;
  document.getElementById("submit").disabled = true
  document.getElementById("play").disabled = false;
  
  if(outcome =="winner"){
    document.querySelector("#endGameMsg").innerHTML = "<h2>Congratulations you won!</h2>";
    
    for(let i=0; i<hiddenMsgArray.length; i++){
      document.querySelector(`.${hiddenMsgArray[i]}`).innerText = hiddenMsgArray[i];
    }
    
  }
  else{
    document.querySelector("#endGameMsg").innerHTML = "<h2>Sorry you lost..</h2>";
  }
  
}

function playGame(){
  
  displayLetters();
  document.querySelector("#letters").className = "enable-letters";
  document.getElementById("feelingLucky").disabled = false;
  document.getElementById("answer").disabled = false;
  document.getElementById("answer").value = "";
  document.getElementById("answer").className = "hidden";
  document.getElementById("submit").disabled = false;
  document.getElementById("submit").className = "hidden";
  
  document.querySelector("#hangman").innerHTML = "<img src='img/post.png' height='400' width='451'>";
  document.querySelector("#incorrectGuess").className = "hidden";
  
  
  errors = 0;
  correct = 0;
  hiddenMsg = "";

  document.querySelector("#endGameMsg").className = "hidden";
  document.querySelector("#playAgain").className = "hidden";
  document.querySelector("#incorrectGuess").className = "hidden";
  
}

function resetGame(){
  document.getElementById("feelingLucky").disabled = true;
  document.getElementById("answer").disabled = false;
  document.getElementById("answer").value = "";
  document.querySelector("#answer").className = "hidden";
  document.querySelector("#message").innerHTML = "";
  displayLetters();
  document.querySelector("#letters").className = "disable-letters";
  document.querySelector("#hangman").innerHTML = "<img src='img/post.png' height='400' width='451'>";
  errors = 0;
  correct = 0;
  hiddenMsg = "";

  document.querySelector("#endGameMsg").className = "hidden";
  document.querySelector("#playAgain").className = "hidden";

  document.querySelector("#incorrectGuess").className = "hidden";
  document.getElementById("submit").disabled = false;
  document.getElementById("submit").className = "hidden";
}

function feelingLucky(){ 
  document.querySelector("#answer").className = "show";
  document.querySelector("#submit").className = "show";
}

function answer(){
  let response = document.querySelector("#answer").value.toUpperCase();

  if(response == hiddenMsg){
    document.querySelector("#incorrectGuess").className = "hidden";
    endGame("winner");
    document.querySelector("#submit").className = "disable-letters";
  }
  else{
    wrongLetter();
    document.querySelector("#incorrectGuess").className = "show";
    document.querySelector("#incorrectGuess").innerHTML = "<h5>Incorrect. Try again!</h5>";
  }
}