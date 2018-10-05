var img;

function setup() {
  // put setup code here
  var imgYear = 2018;
  var imgMonth = 5;
  var imgDate = 22;
  var imgIndex = 0;
  var imgName = 'assets/' + createImageString(imgYear, imgMonth, imgDate, imgIndex);
  console.log(imgName);
  console.log(getImageDateFromString(imgName));
  img = loadImage(imgName);
  // imgIndex = 0;
  loadNextImage(imgName);

  createCanvas(1920, 1080);
}

function draw() {
  // put drawing code here
  clear();
	
  var scale = 3840 / windowWidth;
  image(img, 0, 0, windowWidth, 600 / scale);
}

function loadNextImage(imgName) {
	loadImage(imgName, function(newImg) {
  		img = newImg;
      var imgDate = getImageDateFromString(imgName);
      imgDate.index++;
      imgName = createImageString(imgDate.year, imgDate.month, imgDate.date, imgDate.index);
  		loadNextImage('assets/' + imgName);
    }, function(err) {
      var imgDate = getImageDateFromString(imgName);
      imgDate.index = 0;
      // if(imgDate.index > 120) {
      //   imgDate.index = 0;
      //   imgDate.date++;
      // }
      // if(imgDate.date > 31) {
      //   imgDate.index = 0;
      //   imgDate.date = 0;
      //   imgDate.month++;
      // }
      // if(imgDate.month > 11) {
      //   imgDate.index = 0;
      //   imgDate.date = 0;
      //   imgDate.month = 1;
      //   imgDate.year++;
      // }
      // if(imgDate.year > 2018) {
      //   imgDate.index = 0;
      //   imgDate.date = 0;
      //   imgDate.month = 1;
      //   imgDate.year = 2017;
      // }
      imgName = createImageString(imgDate.year, imgDate.month, imgDate.date, imgDate.index);
      loadNextImage('assets/' + imgName);
  });
}

function createImageString(year, month, date, index) {
  return year + '-' + month + '-' + date + '-' + index + '.jpg';
}

function getImageDateFromString(imgName) {
  var imgNameNoExtension = imgName.split(".");
  var imgNameNoPath = imgNameNoExtension[0].split("/");
  var imgDate = imgNameNoPath[1].split('-');
  var y = parseInt(imgDate[0]);
  var m = parseInt(imgDate[1]);
  var d = parseInt(imgDate[2]);
  var i = parseInt(imgDate[3]);
  return {year: y, month: m, date: d, index: i};
}