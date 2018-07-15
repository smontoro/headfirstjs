//send message and add graphics to guessed cell for hits or misses
var view = {
	//Displays all of our messages
	displayMessage: function(msg){
		var messageArea = document.getElementById("message")
		messageArea.innerHTML = msg
	},
	//displays a hit image
	displayHit: function(location) {
		var cell = document.getElementById(location)
		cell.setAttribute ("class", "hit")
	},
	//displays a miss image
	displayMiss: function(location){
		var cell = document.getElementById(location)
		cell.setAttribute ("class", "miss")
	}
};

//keep track of te ships: where they are, i they've been hit, and if they'se been sunk. 
var model = {
	//size of the grid
	boardSize: 7, 
	//number of ships
	numShips: 3,
	//number of cells per ship
	shipLength: 3, 
	//tracker to know number of ships sunks
	shipsSunk: 0,
	//ship cells and number of hits per cell
	ships: [
	{locations: [0, 0, 0], hits: ["", "", ""]},
	{locations: [0, 0, 0], hits: ["", "", ""]},
	{locations: [0, 0, 0], hits: ["", "", ""]}
	],
	//
	fire: function(guess){
		//loops through three times
			for(var i = 0; i < this.numShips; i++){
				//stores each ship in a ship variable
				var ship = this.ships[i]
				//stores the index of the guess if its in the location 
				var index = ship.locations.indexOf(guess)
				//checks the index to see if its greater than 0, which means its in the array, then displays a message and marks hit if its hit
				if(index >= 0 ){
					//if it is in the index, add "hit" to the hits array
					ship.hits[index] = "hit"
					//add a Hit image to the correct cell
					view.displayHit(guess)
					//displays a message that says "Hit"
					view.displayMessage("Hit!")
					//since its a hit, use the isSunk method to see if all three have been hit
					if(this.isSunk(ship)){
						//if it returns true, display the message
						view.displayMessage("You sank my battleship!")
						//add one to the shipsSunk tracker
						this.shipsSunk++
					}
					return true
				}
			}
			//if the guess doesn't match, display the MISS image
			view.displayMiss(guess)
			//display a missed message
			view.displayMessage("You missed.")
			return false
		},
	//check to see if the number of hits matches the length of the ships
	isSunk: function(ship) {
		//loops through the ships 
		for(var i = 0; i < this.shipsLength; i++){
			//if the hits indexes don't = "hit"
				if(ships.hits[i] !== "hit"){
					//return false
					return false
				}
			}
			//if they do match, return true 
			return true
		},

	generateShipLocations: function(){
		var locations
		for (var i = 0; i < this.numShips; i++){
			do {
				locations = this.generateShip()
			} while (this.collision(locations))
			this.ships[i].locations = locations
		}
	},

	generateShip: function() {
		var direction = Math.floor(Math.random() * 2)
		var row 
		var col 
		if (direction === 1){
			row = Math.floor(Math.random() * this.boardSize)
			col = Math.floor(Math.random() * (this.boardSize - (this.shipLength +1)))
		} else {
			row = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)))
			col = Math.floor(Math.random() * this.boardSize)
			
		}
		var newShipLocations = []
		for( var i = 0; i <this.shipLength; i++) {
			if(direction === 1) {
				newShipLocations.push(row + "" + (col + i))
			} else {
				newShipLocations.push((row+i) + "" + col)
			}
		}


		return newShipLocations
	},

	collision: function(locations) {
		for(var i = 0; i <this.numShips; i++){
			var ship = model.ships[i]
			for (var j = 0; j< locations.length; j++){
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true
				}
			}
		}
		return false
	}
};

//helper function to concert guess into numbers
function parseGuess(guess){
		//store the board letters to convert them to nums
		var alpha = ["A", "B", "C", "D", "E","F", "G"]
		//alert the player if the guess doesn't match these requirements
		if(guess === null || guess.length !== 2) {
			alert("Oops, please enter a letter and a number on the board.")
			//if it does match
		} else {
			//use indexOf to grab the index of the letter in the aplha array and store the index num in the row var
			var row = alpha.indexOf(guess.charAt(0))
			//grab he answers second character
			var column = guess.charAt(1)

			//check to make sure both characters are numbers
			if (isNaN(row) || isNaN(column)) {
				alert("Oops, that isn't on the board.")
				//make sure both characters are a num 0-6
			} else if (row < 0 || row > model.boardSize || column < 0 || column >= model.boardSize) {
				alert("Oops, that's off the board!")
			} else {
				//return the converted number
				return row + column
			}
		}
		return null
	}



//glues everything together including getting the player's input and executing the game logic
var controller = {
	//get and process the player's guess
	//keeps track of numer of guesses
	guesses: 0,
	//Processes guesses and passes them to the model. Detects end of game. 
	processGuess: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++
			var hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses")
			}
		}

	}
	
};


function handleFireButton(){
	var guessInput = document.getElementById("guessInput")
	var guess = guessInput.value
	controller.processGuess(guess)

	guessInput.value = ""

}


function init() {
	var fireButton = document.getElementById("fireButton")
	fireButton.onclick = handleFireButton

	var guessInput = document.getElementById("guessInput")
	guessInput.onkeypress = handleKeyPress

	model.generateShipLocations()
}

function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton")
	if (e.keyCode === 13) {
		fireButton.click()
		return false
	}
}

window.onload = init
















