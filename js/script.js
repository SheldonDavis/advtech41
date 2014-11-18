// JavaScript Document



var myC = document.getElementById("myC");
	//this var chooses the rendering context and its built in drawing functions.
var ctx = myC.getContext("2d");





//invoke a function to make a particle
setInterval( function(){ draw()}, 33);

//set up an empty array to store all our particles
var particles = [];
//generate 50 particles
for(var i=0; i<50; i++){
	particles.push(new create_particle()); 
}

/**
	*this method makes a new particle
	*each rolls up its own x and y pos; velocity
	*and color
*/
function create_particle(){
	//each particle gets a random x and y position
	this.x = Math.random()*1000;
	this.y = Math.random()*1000;
	//random speed & direction
	//then subtract half the max, so that some get neg #'s
	this.vx = Math.random()*20-10;
	this.vy = Math.random()*20-10;
	//random size
	this.radius = Math.random()*20+20;
	//random color
	var r = Math.random()*255>>0;
	var g = Math.random()*255>>0;
	var b = Math.random()*255>>0;

	this.color = "rgba("+r+","+g+","+b+",.5)"

	

}

/**
	*this method draws one while circle
	*displaced a little more each time
*/
function draw(){
	ctx.globalCompositeOperation="source-over";
	//paint the canvas with a black rectangle
ctx.fillStyle = "rgba(0,0,0,.5)";
ctx.fillRect(0,0,1000,1000);

//blend the particles with the background
ctx.globalCompositeOperation="lighter";
//loop through all 50 particles
	for(var t=0; t<particles.length; t++){
		//make a reference to the current particle 
		var p = particles[t];
			//draws a circular path
			ctx.beginPath();
			//specify a fill
			var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
			//at the very center, itll be white
			gradient.addColorStop(0, "white");
			//the whiteness ends
			gradient.addColorStop(0.4, "white");
			//then abruptly become its ovn color
			gradient.addColorStop(0.4, p.color);
			//which blends out to black completeing gradient.
			gradient.addColorStop(1, "black");
			ctx.fillStyle = gradient;
			//make the circle
			ctx.arc(p.x, p.y, p.radius, Math.PI*2, false);
			ctx.fill();
			//et up x,y so next time it moves a bit
			p.x += p.vx;
			p.y += p.vy;
		//if a particle is off the edge of the canvas reset 
//x or y to just off the opposite edge
			if(p.x < -50) p.x = 1050;
			if(p.x > 1050) p.x = -50;
			if(p.y < -50) p.y = 1050;
			if(p.y > 1050) p.y = -50;
	}//end loop through all 50 particles
}