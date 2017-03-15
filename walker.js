function walker(x,y,stop,colour){ // Walker class : position co-ordinates, stuck status, colour 
	this.x = x; 				// Initialise class variables
	this.y = y;					// ^
	this.stop = stop;			// ^
	this.colour = frameCount;	// Set colour to current frame count since start of simulation
	this.walk = function(){  	// Walk function
		if(!this.stop){ 		// If walker has not been stuck
		switch (round(map(random(100),0,100,0,3))){ // Generate random number between 0-100, map that value between 0.0 and 3.0 then round that value to nearest whole number 
			case 0:
						this.x++; // Move right
						break;
			case 1:
						this.y--; // Move up
						break;
			case 2: 
						this.y++; // Move down
						break;
			case 3: 
						this.x--; // Move left
						break;
			default:
						console.log("PANIC"); // If a number outside of this range is somehow produced, panic a lot
		}
		}
		
	}
}
