// *************************************
//Setting up Node and LL classes
// *************************************

// Node class
// A node is just an element of the list that can have different variables/attributes/functions assigned to it
class Node {
    constructor (element) {
        this.element = element; // this is the value (RPS) of an item in the list
        this.next = null; // a node on it's own (not in a list) has nothing that comes after it
    }
}

// Linked List class
class LinkedList {
    constructor() {
        this.head = null; //this creates a reference so we can find the start of the list later
    }

    //Linked List Functions
    //Not all LL functions are needed for RPS
    //I added the only useful one for this game
    
    //adding elements will make the LL for the game
    add(element) {
        var node = new Node(element); // turn an element (this will be R, P, or S later) into a node with that value
        var current; //this is a pointer variable that will let us examine what node in the list we are looking at and modify it when necessary

        if (this.head == null) { //if statement that checks if list is empty or not
            this.head = node; // makes a node 1st in the list if the list is empty
        }
        else { // when the list is not empty
            current = this.head; // point at the start of the list

            while (current.next) { // go through the list until the end
                current = current.next; // move the pointer to the next element in the list
            }
            current.next = node; // add the new element/node to the end of the list and link former element to it
        }
    }


}

// *************************************
//RPS Game Code starts here
// *************************************

//Declare variables
var compChoice;
var totalWins = 0;
var totalLoss = 0;
var totalTies = 0;
var totalGames = 0;
var playerChoice;
var playGame = true;

//Create circular linked list
RPS = new LinkedList();
RPS.add("R"); // add Rock as first element in list
RPS.add("P"); // add Paper as second element in list
RPS.add("S"); // add Scissors as third element in list
var parseNode = RPS.head;

//Link node "S" to node "R"
while (parseNode.element != "S") { // go through list until "S" (the last element) is found
    parseNode = parseNode.next; 
}
parseNode.next = RPS.head; // link "S" to point to "R"



//Play the game
while (playGame == true){
    //Player input and inpput error catching
    while (playerChoice != "R" && playerChoice != "P" && playerChoice != "S") {
        playerChoice = prompt("Please choose one of Rock (R), Paper (P), or Scissors (S): ");
        playerChoice = playerChoice.toUpperCase();
    }
    //computer rolls for R/P/S
    var x = Math.floor(Math.random()*3);
    if (x==0) {
        compChoice = "R";
    }
    else if (x==1) {
        compChoice = "P";
    }
    else {
        compChoice = "S";
    }

    //Locate Player Choice in circular LL
    parseNode = RPS.head // start at the beginning of the list ("R")

    while (parseNode.element != playerChoice) { // go through the list until playerChoice is found
        parseNode = parseNode.next;
    }
    playerChoice = parseNode; // set playerChoice = to the list node with the same value. we want to use LL functions later, so we need to change playerChoice from a string to a Node.

    //Inform player of Computer Choice
    console.log("Computer chose: "+compChoice);

    //Comparisons

    //Case 1: Tie
    if (playerChoice.element == compChoice ) { // playerChoice.element is how to check the string value ("R" or "P" or "S") because playerChoice is a Node now
        totalTies = totalTies + 1;
        console.log("It's a tie!");
    }

    //Case 2: Loss
    else if (playerChoice.next.element == compChoice) { // If the next item in the list matches the compChoice it will be a loss (R<P, P<S, S<R)
        totalLoss = totalLoss + 1;
        console.log("Oh no! You lost!");
    }

    //Case 3: Win
    else { // player input error checking was done earlier, so the only remaining case is a win
        totalWins = totalWins + 1;
        console.log("Congratulations! You won!");
    }

    totalGames = totalGames + 1;

    //Play again? and input error catching
    var replay = "M";
    while (replay != "Y" && replay != "N") {
        replay = prompt("Play again? (Y/N) ").toUpperCase();
    }

    if (replay=="N") {
        playGame = false; // Exit game condition
    }
    // playerChoice is a Node, not a string. It does not need to be reset to satisfy the player input condition at the top

    //Print Stats
    console.log("Here are your current stats:")
    console.log("Wins: "+totalWins);
    console.log("Ties: "+totalTies);
    console.log("Losses: "+totalLoss);
    console.log("Total Games: "+totalGames);
    console.log("Win %: "+(totalWins/totalGames)*100);

}