
var num = 5000; // Number of walkers
var walkers = [num]; 	// Initialise moving walker array
var tree =[];			// Initialise stuck walker array

function setup(){
	var x = 800; // Simulation area size variables
	var y = 800; // ^^ 
	createCanvas(x,y); // Create simulation area 
	tree[0] = new walker(x/2,y/2,true,0); // Create first stuck walker in the centre
	for(var i = 0; i < num; i++){ // For the number of moving walkers
		walkers[i] = new walker( round(random(x)),round(random(y)), false); // Create walker at random position
	}
	
}
function draw(){
	background(0); 		// Draw background
	strokeWeight(1);	// Set drawing options
 	strokeWeight(0);	// ^^
	for(var x = 0; x < num; x++){ // For every unstuck walker
		if(walkers[x] != undefined){ // Check array element has a walker in it
		for(var z = 0; z < 10; z++){ // Walk 10 "steps"
		walkers[x].walk(); // See walker.js for documentation on walk()
		}
		for(var j = 0; j < tree.length; j++){ // For each stuck walker
			if(sq(walkers[x].x - tree[j].x) + sq(walkers[x].y - tree[j].y) <= 25){ // Check if moving walker x is near stuck walker
				walkers[x].stop = true;			// If true make walker stick
				append(tree,walkers[x]);		// Add walker to tree array
				walkers.splice(x,1);			// Remove walker from walkers array
				walkers[x] = new walker( round(random(600)),round(random(600)), false); // Spawn new walker in its place
			}
		}
		
		// Uncomment this section to show unstuck walkers
		//stroke(255);
		//fill(255);
		
		
		//ellipse(walkers[x].x,walkers[x].y,5);
		// End of unstuck walker section
		}
	}
	// Colour mapping
	for(var l = 0; l < tree.length-1; l++){ // For every stuck walker
		var col = map(l,0,tree.length,0,255) // Gradients the colour based on stuck walker age: blue being oldest and purple for newest
		stroke(col,0,128); 	// Set draw options 
		fill(col,0,128); 	// ^^
		ellipse(tree[l].x,tree[l].y,5); // Draw stuck walker
	}
}
