// Buttons and sections that are updated each time the game is played
const pChoiceEl = document.getElementById("pchoice");
const cChoiceEl = document.getElementById("cchoice");
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const statusEl = document.getElementById("status");
const winsEl = document.getElementById("wins");
const tiesEl = document.getElementById("ties");
const lossesEl = document.getElementById("losses");
const totalGamesEl = document.getElementById("totalgames");
const winPercentEl = document.getElementById("win%");
const tenGameButton = document.getElementById("ten");
const hundredGameButton = document.getElementById("hundred");
const resetButton = document.getElementById("resetButton");

// *************************************
//Setting up Node and LL classes
// *************************************

// Node class
// Rock, Paper, or Scissors
class Node {
    constructor (element) {
        this.element = element;
        this.next = null;
    }
}

// Linked List class
class LinkedList {
    constructor() {
        this.head = null; //this creates a reference so we can find the start of the list later
    }

    //Linked List Functions

    //Adding nodes is the only relevant LL function for RPS
    //The rest were omitted
    add(element) {
        let node = new Node(element);
        let current;

        if (this.head == null) {
            this.head = node;
        }
        else {
            current = this.head;

            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
    }


}

// *************************************
// Setting up the LL for the game
// *************************************

//Declare variables
let totalWins = 0;
let totalLoss = 0;
let totalTies = 0;
let totalGames = 0;

//Create circular linked list
RPS = new LinkedList();
RPS.add("Rock");
RPS.add("Paper");
RPS.add("Scissors");
let parseNode = RPS.head;

//Link node "S" to node "R"
while (parseNode.element != "Scissors") {
    parseNode = parseNode.next;
}
parseNode.next = RPS.head;

// *************************************
// Play Game function
// *************************************

function playGame(playerChoice) {
    let compChoice;

    //Computer rolls for R/P/S
    let x = Math.floor(Math.random()*3);
    if (x==0) {
        compChoice = "Rock";
    }
    else if (x==1) {
        compChoice = "Paper";
    }
    else {
        compChoice = "Scissors";
    }

    //Set display elements
    pChoiceEl.innerHTML='<p>You chose: '+playerChoice+'</p><img src="./assets/images/'+playerChoice.toLowerCase()+'.png">';
    cChoiceEl.innerHTML='<p>Computer chose: '+compChoice+'</p><img src="./assets/images/'+compChoice.toLowerCase()+'.png">';

    //Locate Player Choice in circular LL
    parseNode = RPS.head

    while (parseNode.element != playerChoice) {
        parseNode = parseNode.next;
    }
    playerChoice = parseNode;

    //*************
    //Comparisons
    //*************

    //Case 1: Tie
    if (playerChoice.element == compChoice ) { // playerChoice.element is how to check the string value ("R" or "P" or "S") because playerChoice is a Node now
        totalTies += 1;
        statusEl.textContent=("It's a tie!");
    }

    //Case 2: Loss
    else if (playerChoice.next.element == compChoice) { // If the next item in the list matches the compChoice it will be a loss (R<P, P<S, S<R)
        totalLoss += 1;
        statusEl.textContent=("Oh no! You lost!");
    }

    //Case 3: Win
    else { // player input error checking was done earlier, so the only remaining case is a win
        totalWins += 1;
        statusEl.textContent=("Congratulations! You won!");
    }

    totalGames += 1;

    //Print Stats
    winsEl.textContent=("Wins: " + totalWins);
    tiesEl.textContent=("Ties: " + totalTies);
    lossesEl.textContent=("Losses: " + totalLoss);
    totalGamesEl.textContent=("Total Games: " + totalGames);
    winPercentEl.textContent=("Win %: " + ((totalWins / totalGames) * 100).toFixed(2));
}
//******************
// Button Listeners
//******************

rockButton.addEventListener("click", function(event){
    event.preventDefault();
    playGame("Rock");
});
paperButton.addEventListener("click", function(event){
    event.preventDefault();
    playGame("Paper");
});
scissorsButton.addEventListener("click", function(event){
    event.preventDefault();
    playGame("Scissors")
});
tenGameButton.addEventListener("click", function(event){
    event.preventDefault();
    for (i = 0; i < 10; i++) {
        let x = Math.floor(Math.random() * 3);
        if (x == 0) {
            playerChoice = "Rock";
        }
        else if (x == 1) {
            playerChoice = "Paper";
        }
        else {
            playerChoice = "Scissors";
        }
        playGame(playerChoice);
    }
});
hundredGameButton.addEventListener("click", function(event){
    event.preventDefault();
    for (i = 0; i < 100; i++) {
        let x = Math.floor(Math.random() * 3);
        if (x == 0) {
            playerChoice = "Rock";
        }
        else if (x == 1) {
            playerChoice = "Paper";
        }
        else {
            playerChoice = "Scissors";
        }
        playGame(playerChoice);
    }
});
resetButton.addEventListener("click", function(event){
    event.preventDefault();
    totalWins = 0;
    totalLoss = 0;
    totalTies = 0;
    totalGames = 0;
    winsEl.textContent=("Wins: 0");
    tiesEl.textContent=("Ties: 0");
    lossesEl.textContent=("Losses: 0");
    totalGamesEl.textContent=("Total Games: 0");
    winPercentEl.textContent=("Win %: 0.00");
});