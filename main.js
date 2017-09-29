let cv, ctx, w, height;

const CHANCE_OF_JUMP = 0.02; //The chance (in percent) of a large jump
const MAX_AVERAGE_RISE = 10; //The maximum amout (in pixels) that the position is affected in a normal jump
const JUMP_AMOUNT = 50; //The amount (in pixels) that the position is changed by in a jump
const INVERT_CHANCE = 0.25; //The chance that the direction will invert
const DISTANCE_PER_CHANGE = 5; //The greater this number, the more gradual each change appears
const FILL_COLOR = "#AED581"; //The colour of the landscape in the foreground
const BACK_COLOR = "#DCEDC8" //The colour of the sky in the background

window.onload = ((ev)=> {
	//Preset the variables we will need
	cv = document.getElementById("cv");
	w = cv.width;
	h = cv.height;
	ctx = cv.getContext("2d");

	cv.style.backgroundColor = BACK_COLOR;
	ctx.fillStyle = FILL_COLOR

	ctx.translate(0, h); //Ensure that 0 on the y axis is at the bottom, not the top

	new landscape(); //Create a new landscape

})

/*
A single Y Coordinate that increase or decrease in a predictable way
*/
class yCoord {

	constructor() {
		this.position = 0; //The current y position
		this.increase = true; //When true, the amount increases. When false, it decreases
	}

	/*
	Return the current y position
	*/
	get() {
		return this.position;
	}

	/*
	Generate the next y position
	*/
	next() {
		let change = 0;
		if (Math.random() <= CHANCE_OF_JUMP) { //Generate a random number (which will be between 0 and 1). CHANCE_OF_JUMP is a percentage value, represented as a decimal (i.e. 0.45 for 45%), that there will be a sudden, large jump in height. If the random number that we generate is less than the percentage, then we can make the jump, as that represents one "lot" of that percentage
			change = JUMP_AMOUNT; //Make the jump by setting change to the amount to jump by
		}
		change += Math.ceil(Math.random()*10); //Add a random number between 1 and 10 to the change. This happens every iteration, including after a jump (meaning the landscape should look less predictable)
		this.increase = (Math.random()<=INVERT_CHANCE)?!this.increase:this.increase; //Use the same random percentage technique detailed above to decide whether to flip this boolean value. If true, the change is subtracted from the existing value (meaning the height will visually increase), if false the height will visually decrease
		change *= 1+(this.increase*-2); //Booleans are simply a number (true=1, false=0) in JavaScript. So, if we multiply the increase boolean by -2, we get either -0 if it is false or -2 if it is true. This means that if we add one to either of those values, we get 1 or -1 respectively. Therefore, the outcome is that if we multiply change by this number, it will remain the same if this.increase is false, or be made negative if this.increase is true
		this.position += change; //Add the change to the current position
		if (this.position>0) { //If the position is greater than 0 (visually less than zero), then it could go below the bottom of the canvas. We don't want this.
			this.position = 0; //Ensure it simply remains at 0
		}
		//We do not mind if the position goes over the top of the canvas
	}
}

class landscape {

	constructor() {
		this.y = new yCoord(); //Create a yCoord object
		this.x = 0;
		this.prevX = 0;
		this.prevY = 0;

		while (this.x<=w) { //Until the x position reaches the end of the canvas
			this.prevX = this.x; //Set the previous x position to be the current one
			this.prevY = this.y.get(); //Set the previous y position to be the current one
			this.y.next(); //Get the new y position from the yCoord object
			this.x += DISTANCE_PER_CHANGE; //Add the DISTANCE_PER_CHANGE constant to the x position
			this.draw(); //Draw the landscape at this point
		}

	}

	/*
	Draw a single polygon of the landscape
	*/
	draw() {
		ctx.beginPath();
		ctx.moveTo(this.prevX, this.prevY); //Start at the top left corner of the polygon
		ctx.lineTo(this.x, this.y.get()); //Draw to the top right corner
		ctx.lineTo(this.x, 0); //Then draw to the bottom right corner
		ctx.lineTo(this.prevX, 0); //Then to the bottom left corner
		ctx.closePath();
		ctx.fill(); //Fill the entire polygon
	}
}