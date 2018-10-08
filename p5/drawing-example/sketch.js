var img;
var averageImg;
var globalImgName;
var globalFound;
var cumImg;
var numImages;

var imgYear = 2017;
var imgMonth = 6;
var imgDate = 14;
var imgIndex = 119;
var imgName;

function preload() {

  imgName = 'assets/SKWorkshopImages/' + createImageString(imgYear, imgMonth, imgDate, imgIndex);

  // var cumImgStart = 'assets/SKWorkshopImages/' + createImageString(2018, 4, 12, 118);
  img = loadImage(imgName);
  cumImg = loadImage(imgName);
}

function setup() {
  // put setup code here
  img.loadPixels();
  cumImg.loadPixels();
  numImages = 1;

  // addImageToCMA(img);

  loadNextImage(imgName);

  // imgIndex = 0;
  // loadNextImage(imgName);

  createCanvas(1920, 1080);
}

function draw() {
  clear();
  // cumImg.loadPixels();
  // console.log(cumImg.pixels);
	
  var scale = 3840 / windowWidth;
  var height = 600 / scale;
  image(img, 0, 0, windowWidth, height);
  if(globalFound) {
    fill(0);
  } else {
    fill(255, 0, 0);
  }
  text(globalImgName, 10, height + 20);
  image(cumImg, 0, height + 40, windowWidth, height);
}

function loadNextImage(imgName) {
  globalImgName = imgName;
	loadImage(imgName, function(newImg) {
  		img = newImg;
      var imgDate = getImageDateFromString(imgName);
      imgDate.date++;
      imgName = createImageString(imgDate.year, imgDate.month, imgDate.date, imgDate.index);
      globalFound = true;
      addImageToCMA(newImg);
  		loadNextImage('assets/SKWorkshopImages/' + imgName);
    }, function(err) {
      var imgDate = getImageDateFromString(imgName);
      // imgDate.index++;
      // if(imgDate.index > 119) {
      //   imgDate.index = 0;
      //   imgDate.date++;
      // }
      imgDate.date++;
      if(imgDate.date > 31) {
        imgDate.index = 119;
        imgDate.date = 0;
        imgDate.month++;
      }
      if(imgDate.month > 11) {
        imgDate.index = 119;
        imgDate.date = 0;
        imgDate.month = 1;
        imgDate.year++;
      }
      if(imgDate.year > 2018) {
        imgDate.index = 119;
        imgDate.date = 0;
        imgDate.month = 1;
        imgDate.year = 2017;
      }
      globalFound = false;
      imgName = createImageString(imgDate.year, imgDate.month, imgDate.date, imgDate.index);
      loadNextImage('assets/SKWorkshopImages/' + imgName);
  });
}

function addImageToCMA(newImg) {
  newImg.loadPixels();
  cumImg.loadPixels();
  for(var x = 0; x < cumImg.width * 26; x += 4) {
    for(var y = 0; y < cumImg.height * 26; y += 4) {
      var newR = newImg.pixels[x * cumImg.width + y + 0];
      var newG = newImg.pixels[x * cumImg.width + y + 1];
      var newB = newImg.pixels[x * cumImg.width + y + 2];

      var oldR = cumImg.pixels[x * cumImg.width + y + 0];
      var oldG = cumImg.pixels[x * cumImg.width + y + 1];
      var oldB = cumImg.pixels[x * cumImg.width + y + 2];

      var newCumR = (newR + numImages * oldR) / (numImages + 1);
      var newCumG = (newG + numImages * oldG) / (numImages + 1);
      var newCumB = (newB + numImages * oldB) / (numImages + 1);

      cumImg.pixels[x * cumImg.width + y + 0] = newCumR;
      cumImg.pixels[x * cumImg.width + y + 1] = newCumG;
      cumImg.pixels[x * cumImg.width + y + 2] = newCumB;
    }
  }
  cumImg.updatePixels();
  numImages++;
}

function createImageString(year, month, date, index) {
  return year + '-' + month + '-' + date + '-' + index + '.jpg';
}

function getImageDateFromString(imgName) {
  var imgNameNoExtension = imgName.split(".");
  var imgNameNoPath = imgNameNoExtension[0].split("/");
  var imgDate = imgNameNoPath[imgNameNoPath.length-1].split('-');
  var y = parseInt(imgDate[0]);
  var m = parseInt(imgDate[1]);
  var d = parseInt(imgDate[2]);
  var i = parseInt(imgDate[3]);
  return {year: y, month: m, date: d, index: i};
}