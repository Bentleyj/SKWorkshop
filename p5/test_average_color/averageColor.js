var img;

var averageColor = [];

function preload() {
	var currentImageName = '../assets/SKWorkshopImages/2018-6-6-5.jpg';

  	img = loadImage(currentImageName);
}

function setup() {
  // put setup code here

  	img.resize(250, 0);

	var totalColor = img.get(0, 0);

	var x = 0;
	var y = 0;
	var n = 0;

	while(x < img.width) 
	{
		while(y < img.height) 
		{
			totalColor[0] = totalColor[0] + img.get(x, y)[0];
			totalColor[1] = totalColor[1] + img.get(x, y)[1];
			totalColor[2] = totalColor[2] + img.get(x, y)[2];

			y = y + 1;
		}
		y = 0;
		x = x + 1;
	}

	averageColor[0] = totalColor[0] / (img.width * img.height);
	averageColor[1] = totalColor[1] / (img.width * img.height);
	averageColor[2] = totalColor[2] / (img.width * img.height);

	console.log("Average Color is: " + averageColor);

  	createCanvas(1920, 1080);
}

function draw() {
  	var scale = windowWidth / img.width;
  	var height = img.height * scale;
	image(img, 0, 0, windowWidth, height);

	var color = img.get(mouseX / scale, mouseY / scale);

	fill(color);
	rect(100, 100, 100, 100);

	fill(averageColor);
	rect(100, 200, 100, 100);
}

