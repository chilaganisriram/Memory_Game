var arr1 = ["😀","😍","🥳","😎","😱","😇","🤯","👽"]
var arr =[...arr1,...arr1].sort()

container = document.getElementById("container")
attempt = document.getElementById("attempt")
let timerElement = document.getElementById("timer");
let seconds = 0;
let timerInterval = null;
let gameStarted = false;


flippedCards = []
matchedPairs = 0
attempts = 0;

 
const shuffleElementsCopy = (arr) => { //shuffing the cards
    const shuffledArr = [...arr]; // Shallow copy
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }

    return displayData(shuffledArr)

  };

function displayData(Sarr){ 
    

    attempt.innerHTML=`Attempts : ${attempts}`
    for(let sym of Sarr){
        console.log(sym)
        let card = document.createElement("div")
        card.className = "card"
        card.innerText = ""

        card.symbol=sym;
        card.flipped = false;
        card.matched = false;

        card.onclick = function (){
           console.log("clicked");
           if (!gameStarted) {
            gameStarted = true;
            startTimer();
            }
        
           if(card.flipped || card.matched || flippedCards.length === 2) return ;
           card.innerText = card.symbol;
           card.flipped = true;
           flippedCards.push(card)

          if(flippedCards.length === 2){
            attempts ++;
            attempt.innerHTML=`Attempts : ${attempts}`

            revealCards()
            }
        }
         container.append(card)
        }

    }

function revealCards(){
  if( flippedCards[0].symbol == flippedCards [1].symbol){
    matchedPairs ++
    flippedCards[0].matched = true;
    flippedCards[1].matched = true;
    flippedCards = [];
    if(matchedPairs == arr1.length){
      alert(`You Won Game in ${seconds} seconds and ${attempts} attempts!`);
      clearInterval(timerInterval);
    }
  }
  else{
    setTimeout(() => {
      flippedCards[0].innerText = "";
      flippedCards[1].innerText = "";
      flippedCards[0].flipped = false;
      flippedCards[1].flipped = false;
      flippedCards = []
    },1000)
  }
}

function startTimer() {
    timerInterval = setInterval(() => {
      seconds++;
      timerElement.innerText = `Time: ${seconds}s`;
  }, 1000);
}


function resetGame() {
  console.log("reset clicked");
  attempts = 0;
  seconds = 0;
  matchedPairs = 0;
  gameStarted = false;
  clearInterval(timerInterval);
  timerElement.innerText = `Time: ${seconds}s`;
  attempt.innerHTML = `Attempts : ${attempts}`;
  container.innerHTML = ""; // clear old cards
  shuffleElementsCopy(arr);
}



resetGame()
