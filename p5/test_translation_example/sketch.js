var imgs = [];
var ImagesFilePath;
var currentImageName;
var step = 0;
var origin;

function preload() {
  var imgYear = 2018;
  var imgMonth = 5;
  var imgDate = 1;
  var imgIndex = 0;
  ImagesFilePath = '../../assets/SKWorkshopImages/';
  currentImageName = ImagesFilePath + createImageString(imgYear, imgMonth, imgDate, imgIndex);

}

function setup() {
  // put setup code here
    createCanvas(1080, 1080);
    loadNewImage(currentImageName);
    background(127);
    origin = {x: windowWidth/4, y:  windowHeight/2};

}

function draw() {
  // clear();
  // You can use any of these functions to draw different effects. Pick one or mix them up. 
  // If you use more than one note the performance loss you'll experience!
  drawScale();
  // drawSlightTwist();
  // drawSpiral();
  // drawSlideDown();
  // drawSlideUp();

}

function drawSlightTwist() {
    var x = 0;
  var y = 0;
  step += 0.01;

  // origin.x = lerp(origin.x, mouseX, 0.01);
  // origin.y = lerp(origin.y, mouseY, 0.01);
  for(var i = 0; i < imgs.length; i++) {
    push();
      var amount = map(i, 0, imgs.length, 0, 1);
      translate(origin.x * (1.0 - amount), origin.y * (1.0 - amount));
      translate(mouseX * amount, mouseY * amount);
      scale(map(i, 0, imgs.length, 2, 0));
      translate(imgs[i].width/2, imgs[i].height/2)
      rotate(i*PI/100);
      translate(-imgs[i].width/2, -imgs[i].height/2)
      image(imgs[i], 0, 0, imgs[i].width, imgs[i].height);
    pop();
  }
}

function drawSpiral() {
    var x = 0;
  var y = 0;
  step += 0.01;

  // origin.x = lerp(origin.x, mouseX, 0.01);
  // origin.y = lerp(origin.y, mouseY, 0.01);
  for(var i = 0; i < imgs.length; i++) {
    push();
      var amount = map(i, 0, imgs.length, 0, 1);
      translate(origin.x * (1.0 - amount), origin.y * (1.0 - amount));
      translate(mouseX * amount, mouseY * amount);
      scale(map(i, 0, imgs.length, 2, 0));
      translate(imgs[i].width/2, imgs[i].height/2)
      rotate(i*PI/20);
      translate(-imgs[i].width/2, -imgs[i].height/2)
      image(imgs[i], 0, 0, imgs[i].width, imgs[i].height);
    pop();
  }
}

function drawSlideDown() {
    var x = 0;
  var y = 0;
  step += 0.01;

  // origin.x = lerp(origin.x, mouseX, 0.01);
  // origin.y = lerp(origin.y, mouseY, 0.01);
  for(var i = 0; i < imgs.length; i++) {
    push();
      translate(0, i*10);
      image(imgs[i], 0, 0, imgs[i].width, imgs[i].height);
    pop();
  }
}

function drawSlideUp() {
  var x = 0;
  var y = 0;
  step += 0.01;

  // origin.x = lerp(origin.x, mouseX, 0.01);
  // origin.y = lerp(origin.y, mouseY, 0.01);
  for(var i = imgs.length-1; i > 0; i--) {
    push();
      translate(0, i*10);
      image(imgs[i], 0, 0, imgs[i].width, imgs[i].height);
    pop();
  }
}

function drawScale() {
    var x = 0;
  var y = 0;
  step += 0.01;

  // origin.x = lerp(origin.x, mouseX, 0.01);
  // origin.y = lerp(origin.y, mouseY, 0.01);
  for(var i = 0; i < imgs.length; i++) {
    push();
      translate(imgs[i].width/2, imgs[i].height/2);
      scale(map(i, 0, imgs.length-1, 1, 0));
      translate(-imgs[i].width/2, -imgs[i].height/2);
      image(imgs[i], 0, 0, imgs[i].width, imgs[i].height);
    pop();
  }
}

function loadNewImage(imgName) {
  loadImage(imgName, function(newImg) {
      newImg.resize(newImg.width/4, newImg.height/4);
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