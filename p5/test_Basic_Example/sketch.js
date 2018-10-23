var img;

function setup() {
  // put setup code here
  var currentImageName = '../../assets/SKWorkshopImages/2018-6-6-5.jpg';

  img = loadImage(currentImageName);

  createCanvas(1920, 1080);

}

function draw() {
  // put drawing code here
  for(var i = 0; i < 100; i++) {
  	push();
  	translate(50, 3840/4/2);
  	translate(3840/4/2, 600/4/2);
  	rotate(PI/10 * i);
	translate(-3840/4/2, -600/4/2);
	image(img, 0, 0, 3840/4, 600/4);
	pop();
  }
}