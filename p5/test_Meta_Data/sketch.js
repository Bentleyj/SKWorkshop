var imgs = [];
var ImagesFilePath;
var currentImageName;
var step = 0;

function preload() {
  var imgYear = 2018;
  var imgMonth = 2;
  var imgDate = 24;
  var imgIndex = 0;
  ImagesFilePath = '../../assets/SKWorkshopImages/';
  currentImageName = ImagesFilePath + createImageString(imgYear, imgMonth, imgDate, imgIndex);

}

function setup() {
  // put setup code here
  createCanvas(1920, 1080);
    loadNewImage(currentImageName);

}

function draw() {
  // put drawing code here
  var x = 0;
  var y = 0;
  step += 0.01;
  for(var i = 0; i < imgs.length; i++) {
    push();
      translate(canvas.width/2, canvas.height/2)
      // translate(mouseX, mouseY);
      scale(map(i, 0, imgs.length, 2, 0));
      translate(-imgs[i].width/2, -imgs[i].height/2)
  	  image(imgs[i], 0, 0, imgs[i].width, imgs[i].height);
  	pop();
  }
}

function loadNewImage(imgName) {
  loadImage(imgName, function(newImg) {
      newImg.resize(newImg.width/8, newImg.height/8);
      if(newImg != null) {
        imgs.push(newImg);
      }
      if(imgs.length > 90) {
        imgs.shift();
      }
      imgName = getNextImgName(imgName);
      if(imgName != null) {
        loadNewImage(ImagesFilePath + imgName);
      }
    }, function(err) {
      imgName = getNextImgName(imgName);
      if(imgName != null) {
        loadNewImage(ImagesFilePath + imgName);
      }
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