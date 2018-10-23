var img, diffImg;
var currentImageName;
var ImagesFilePath;

function setup() {
  // put setup code here
  var imgYear = 2017;
  var imgMonth = 6;
  var imgDate = 14;
  var imgIndex = 0;
  ImagesFilePath = '../../assets/SKWorkshopImages/';
  currentImageName = ImagesFilePath + createImageString(imgYear, imgMonth, imgDate, imgIndex);

  diffImg = loadImage(currentImageName);
  diffImg.loadPixels();
  img = loadImage(currentImageName);
  loadNewImage(currentImageName);

  createCanvas(1920, 1080);
}

function draw() {
  // put drawing code here
  clear();
	
  var scale = 3840 / windowWidth;
  var width = windowWidth;
  var height = 600 / scale;
  image(img, 0, 0, width, height);

  var x = map(mouseX, 0, width, 0, img.width);
  var y = map(mouseY, 0, height, 0, img.height);
  var c = img.get(x, y);
  fill(c);

  rect(0, height, 50, 50);

  var s = "RGB(" + c[0] + ", " + c[1] + ", " + c[2] + ")"
  fill(0);
  text(s, 0, height + 20 + 50);

  text(currentImageName.substr(0, 9) , 0, height + 20 + 50 + 20);

  image(diffImg, 0, height + 20 + 50 + 10, width, height);
}

function loadNewImage(imgName) {
	loadImage(imgName, function(newImg) {
      getImageDifference(img, newImg);
      diffImg = img;
      img = newImg;
      imgName = getNextImgName(imgName);
      loadNewImage(ImagesFilePath + imgName);
    }, function(err) {
      imgName = getNextImgName(imgName);
      loadNewImage(ImagesFilePath + imgName);
  });
}

function getNextImgName(imgName) {
  var imgDate = getImageDateFromString(imgName);
  imgDate.index++;
  if(imgDate.index > 119) {
    imgDate.index = 0;
    imgDate.date++;
  }
  if(imgDate.date > 31) {
    imgDate.index = 0;
    imgDate.date = 0;
    imgDate.month++;
  }
  if(imgDate.month > 11) {
    imgDate.index = 0;
    imgDate.date = 0;
    imgDate.month = 1;
    imgDate.year++;
  }
  if(imgDate.year > 2018) {
    imgDate.index = 0;
    imgDate.date = 0;
    imgDate.month = 6;
    imgDate.year = 2017;
  }
  currentImageName = createImageString(imgDate.year, imgDate.month, imgDate.date, imgDate.index);
  return currentImageName;
}

function createImageString(year, month, date, index) {
  return year + '-' + month + '-' + date + '-' + index + '.jpg';
}

function getImageDateFromString(imgName) {
  var imgNameNoPath = imgName.split("/");
  var imgNameNoExtension = imgNameNoPath[imgNameNoPath.length-1].split(".");
  var imgDate = imgNameNoExtension[imgNameNoExtension.length-2].split('-');
  var y = parseInt(imgDate[0]);
  var m = parseInt(imgDate[1]);
  var d = parseInt(imgDate[2]);
  var i = parseInt(imgDate[3]);
  return {year: y, month: m, date: d, index: i};
}

function getImageDifference(img1, img2) {
  img1.loadPixels();
  img2.loadPixels();
  var pixels = img1.pixels;
  var previousPixels = img2.pixels;
  var thresholdAmount = 15 * 3;
  var h = img1.height;
  var w = img1.width;
  var i = 0;
  for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
      // calculate the differences
      var rdiff = Math.abs(pixels[i + 0] - previousPixels[i + 0]);
      var gdiff = Math.abs(pixels[i + 1] - previousPixels[i + 1]);
      var bdiff = Math.abs(pixels[i + 2] - previousPixels[i + 2]);
      var diffs = rdiff + gdiff + bdiff;
      var outputr = 0;
      var outputg = 0;
      var outputb = 0;

      if (diffs > thresholdAmount) {
        outputr = pixels[i + 0];
        outputg = pixels[i + 1];
        outputb = pixels[i + 2];

      }
      pixels[i++] = outputr;
      pixels[i++] = outputg;
      pixels[i++] = outputb;
      // also try this:
      // pixels[i++] = rdiff;
      // pixels[i++] = gdiff;
      // pixels[i++] = bdiff;
      i++; // skip alpha
    }
  }
  img1.pixels = pixels;
  img1.updatePixels();
}
 
function keyPressed() {
  return false;
}