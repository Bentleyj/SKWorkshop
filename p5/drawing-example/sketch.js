var img;
var currentImageName;

function setup() {
  // put setup code here
  var imgYear = 2017;
  var imgMonth = 6;
  var imgDate = 14;
  var imgIndex = 0;
  currentImageName = 'assets/SKWorkshopImages/' + createImageString(imgYear, imgMonth, imgDate, imgIndex);

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
}

function loadNewImage(imgName) {
	loadImage(imgName, function(newImg) {
  		img = newImg;
      imgName = getNextImgName(imgName);
      loadNewImage('assets/SKWorkshopImages/' + imgName);
    }, function(err) {
      imgName = getNextImgName(imgName);
      loadNewImage('assets/SKWorkshopImages/' + imgName);
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
  var imgNameNoExtension = imgName.split(".");
  var imgNameNoPath = imgNameNoExtension[0].split("/");
  var imgDate = imgNameNoPath[imgNameNoPath.length-1].split('-');
  var y = parseInt(imgDate[0]);
  var m = parseInt(imgDate[1]);
  var d = parseInt(imgDate[2]);
  var i = parseInt(imgDate[3]);
  return {year: y, month: m, date: d, index: i};
}
 
function keyPressed() {
  return false;
}