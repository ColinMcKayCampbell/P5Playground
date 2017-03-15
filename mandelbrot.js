	
	
	var iteration; 				// Initialise variables for DOM input
	var max_iteration = 500;			
	var maxX;					
	var minX;
	var maxY;
	var minY;
	
function setup(){
	
	var cnv = createCanvas(800,800); // Create drawing area
	cnv.id("canvas"); // Set ID attribute of canvas element
	background(100); // Set background colour
	createDiv("Max X"); // Create DOM input elements
	maxX = createInput(1,"number");
	createDiv("Min X");
	minX = createInput(-2,"number");
	createDiv("Max Y");
	maxY = createInput(1.25,"number");
	createDiv("Min Y");
	minY = createInput(-1.25,"number");
	var button = createButton('Generate');
	button.mousePressed(redraw); // If Generate button is pressed redraw Mandelbrot
}
	
	

function draw(){
	window.alert("This could take a while depending on your computer. \n\n For comparison: Takes 11 seconds on an i5-3570K @ 5.2GHz running in Vivaldi 1.7.735.46. "); // Slow ass program warning
	var color = 0; // Colour variable
	for(var Px = 0; Px < width; Px++){ // For each pixel in the X axis of the drawing space
		for(var Py = 0; Py < height; Py++){ // Cycle Y axis
			
			var x = 0.0; 
			var y = 0.0;
			
			var x0 = map(Px, 0, width,float(minX.value()),float(maxX.value())); 	// Map current pixel to virtual X co-ordinate space used to calculate the set -- x0 is the x value for the drawing space drawn
			var y0 = map(Py, 0, height, float(minY.value()),float(maxY.value())); 	// Repeat for Y 
			while((x*x) + (y*y) < 8 && iteration < max_iteration) // While X squared + Y squared is less than 8 (in virtual Mandelbrot space) AND max iteration has not been reached
			{
						var xtemp = x*x - y*y + x0; // X squared - Y squared + current virtual X co-ordinate
						y  = 2*(x*y) + y0; // 2 times ( X times Y) + current virtual Y co-ordinate
						x = xtemp; 
						iteration++; 
			}
			
			if(iteration == max_iteration){ // When max iteration is reached
				colourX = 128;//map(Px,0,width,0,190);	// Colour pixel based on position
				colourY = map(Py,0,width,0,190);
				fill(colourX,colourY,0);				// Set draw options
				stroke(colourX,colourY,0);
			}
			else{
			
			var colour =(map(iteration,1,max_iteration,0,255)) *20; // Set colour based on number of iterations
			fill(colour,colour,0); 									// Set draw options
			stroke(colour,colour,0);
			
			}
			
			point(Px,Py);	// Draw point 
			iteration = 0;	// Reset iteration counter
		
		}
	}
	noLoop(); // Run draw function only once, removing this will crash your browser.
}

