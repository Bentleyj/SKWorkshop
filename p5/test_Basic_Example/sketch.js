var img;

function setup() {
  // put setup code here
  var currentImageName = '../../assets/SKWorkshopImages/2018-6-6-5.jpg';

  img = loadImage(currentImageName);

  createCanvas(1920, 1080);

}

function draw() {
  // put drawing code here
	 image(img, 0, 0, 3840/4, 600/4);
}