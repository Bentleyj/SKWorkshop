var imgToCrop;
var cropped;

function cropImage(img) {
    var img;
    var croppedImg;

    img.resize(500, 0);

    croppedImg = createImage(210, 75);

    croppedImg.loadPixels();
    img.loadPixels();

    var x = 0;
    var y = 0;
    while(x < croppedImg.width) {
        while(y < croppedImg.height) {
            var col = img.get(x + 160, y);
            croppedImg.set(x, y, col);
            y = y + 1;
        }
        y = 0;
        x = x + 1;
    }

    croppedImg.updatePixels();

    croppedImg.save("cropped", "jpg");

    return croppedImg;
}

function preload() {
	var currentImageName = '../assets/SKWorkshopImages/2018-6-6-6.jpg';
  	imgToCrop = loadImage(currentImageName);
}

function setup() {
    // put setup code here
    cropped = cropImage(imgToCrop);
    createCanvas(1920, 1080);
}

function draw() {
	image(imgToCrop, 0, 0, imgToCrop.width, imgToCrop.height);
	image(cropped, 0, imgToCrop.height, cropped.width, cropped.height);


}