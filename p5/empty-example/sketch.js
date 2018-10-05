var img;

function setup() {
  	// put setup code here
  	img = loadImage('assets/2017-10-8-35.jpg');
  	createCanvas(1920, 1080);
}

function draw() {
	clear();
  	// put drawing code here
  	var scale = 3840 / windowWidth;
  	image(img, 0, 0, windowWidth, 600 / scale);
    // ellipse(50, 50, 50, 100);
}