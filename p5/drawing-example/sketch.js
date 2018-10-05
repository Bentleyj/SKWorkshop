var img;

var imgName;

var imgIndex, imgDate, imgMonth, imgYear;

function setup() {
  // put setup code here
  img = loadImage('assets/2018-1-14-0.jpg');
  imgName = "2018-1-14-";
  imgIndex = 0;
  loadNextImage();

  createCanvas(1920, 1080);
}

function draw() {
  // put drawing code here
  clear();
	
  var scale = 3840 / windowWidth;
  image(img, 0, 0, windowWidth, 600 / scale);
}

function loadNextImage() {
	var newName = imgName + imgIndex;
	loadImage('assets/' + newName + '.jpg', function(newImg) {
  		imgIndex++;
  		img = newImg;
  		loadNextImage();
    }, function(err) {
      imgIndex = 0;
      loadNextImage();
  });
}