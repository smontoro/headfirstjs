//user starts the game

//game places a battleship at a random locatino on the grid

//game play beings
//promt user for a guess
//check the user's guess against the battleship to look for a hit, miss, or sink

//game finishes
//give the user a rating based on the number of guesses

var randomLoc = Math.floor(Math.random() * 5)
var location1 = randomLoc
var location2 = randomLoc + 1
var location3 = randomLoc + 2
var guess 
var hits = 0
var guesses = 0
var isSunk = false

//while the ship is not sunk
while(isSunk == false){
	//get the users guess
	guess = prompt("Ready, aim, fire! (enter a number from 0-6)")
	//compare the guess to valid input values
	//if the user's guess is invalid, 
	if(guess < 0 || guess > 6 ){
		//tell the user to enter a valid number
		prompt("Please enter a valid cell number!")
	//else
	} else {
		//add one to guesses
		guesses = guesses + 1
		//check to see if guess matches location cells
		if( guess == location1 || guess == location2 || guess == location3){
			//alert "HIT"
			alert("HIT!")
			//if it matches, add one to hits
			hits = hits + 1
			//if # of hits is 3
			if(hits == 3){
				//set isSunk to true
				isSunk = true
				//tell user "you sunk my battleship"
				alert("you sank my battleship!")
			}
		} else {
			alert("MISS!")
		}

	}
	
}

//give the user their stats
var stats = "You took " + guesses + " guesses to sink my battleship, " + "which means your shooting accuracy was " + (3/guesses)

alert(stats)





	
