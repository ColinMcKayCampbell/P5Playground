
// Declare and initialise variables

var x = 400; // Starting co=ordinates
var y = 400; 

var weight = 1; // Particle weight

var Xforce = 0; // Component forces
var Yforce = 0;

var Xspeed = 0; // Component speeds
var Yspeed = 0;

var Xacceleration = 0; // Component acceleration
var Yacceleration = 9.81;

function setup(){
	
	createCanvas(800,800); // Creates drawing space
	angleMode(DEGREES);	 // Set angle mode to degrees
}
function draw(){ // For each frame
	
	var frames = floor(frameRate()); // Get current frame-rate
	
	background(128,128,128); // Draw background
	
	strokeWeight(0);// ^ 
	noSmooth();  	// 	Set drawing options for frame counter
	stroke(0);		//
	fill(0); 		// v
	
	text(frames, 25, height/32); // Draw frame rate counter
	
	strokeWeight(1);	//^
	stroke(255,0,255);	// Set drawing options for particle
	fill(255,0,255);	//V
	
	
	ellipse(x,y,10); // Draw particle at x,y size 10
	
	x = x + Xspeed; // Increment x by speed		^	Produces 2 dimensional movement 
	y = y + Yspeed; // Increment y by speed		v 
	

	
	// Drag calculation
	
	// Drag equation used is :
	// D = Cd * A * (p * V^2)/2 
	// Where :
	// D = drag force
	// Cd = Coefficient of drag (a predetermined value calculated from the shape, particle is assumed to be spherical in this case)
	// Area = arbitrary area given for the particle
	// p = fluid density (actual density of air is used)
	// V = velocity 
	
	var XdragForce =  0.47 * 0.1 * (1.225 * sq(Xspeed))/2; // Calculate drag for X component
	
	if (Xspeed > 0){Xacceleration = (XdragForce/weight) * -1;} // Accurately apply drag to acceleration for direction of travel
	else{Xacceleration =(XdragForce/weight);}
	
	Xspeed = Xspeed + Xacceleration/7; // Apply resulting acceleration to speed (with some tuning for usability)
	
	var YdragForce = 0.25 * 0.47 * 0.1 * (1.204 * sq(Yspeed))/2;		//	^
	
	if (Yspeed > 0){Yacceleration = 9.81 + (YdragForce/weight) * -1;}	//	Repeat for Y component
	else{Yacceleration = 9.81 +(YdragForce/weight);}					//
	
	Yspeed = Yspeed + Yacceleration/7;									//	v
	
	
	
	if (x >= 800){Xspeed = Xspeed * -1;} 			//	^
	if (x <= 0){Xspeed = Xspeed * -1;}				//	Simple edge detection for drawing space
	if (y >= 800){Yspeed = (0.8 * Yspeed) * -1;}	//
	if (y <= 0){Yspeed = Yspeed * -1;}				//	v
	
	if (mouseIsPressed){		// OnClick attract particle to cursor
		Xforce = mouseX - x;  	// Get force components based on relative position of mouse cursor and particle
		Yforce = mouseY - y;	// ^
		if(Xforce > 0){
			if(Xforce > 15){Xforce = 15; break;} // Limit force applied to 15
			break;
		}
		else{
			if(Xforce < -15){Xforce = -15;break;} 
			break;
		}
		if(Yforce > 0){
			if(Yforce > 15){Yforce = 15; break;} // Repeat for Y component
			break;
		}
		else{
			if(Yforce < -15){Yforce = -15;break;} 
			break;
		}
		
		Xacceleration = Xforce / weight; // Use rearranged Force = Mass * Acceleration to find resulting acceleration for X component
		Xspeed = Xspeed + Xacceleration; // Apply acceleration to Xspeed
		Yacceleration = Yforce / weight; // Repeat for Y component
		Yspeed = Yspeed + Yacceleration;
}
}