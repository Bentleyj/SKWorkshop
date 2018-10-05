/*

Created by James Bentley on October 2 2018. 
This is an app for sorting through the images of our original sunrise project.
The file structure is as follows:
Year/Month/ImageIndex-Day-ResWxResH.jpg
At max scale there is no ResWxResH line and there are some images that only have the structure:
Year/Month/ImageIndex-ResWxResH.jpg

I want to sort my files in to the following file structure:
Size/Year/Month/Day/ImageIndex.jpg

Got recursive file search algorithm from: https://stackoverflow.com/questions/25460574/find-files-by-extension-html-under-a-folder-in-nodejs

*/

var fs = require("fs-extra");
var path = require("path");

fs.mkdirp("data/Small", function(err, made) {
	if(err)
		throw err;
	else
		console.log(made);
});

fs.mkdirp("data/Medium", function(err, made) {
	if(err)
		throw err;
	else
		console.log(made);
});

fs.mkdirp("data/Large", function(err, made) {
	if(err)
		throw err;
	else
		console.log(made);
});

var Folder2018 = "data/2018";

function fromDir(startPath, filter) {
	if(!fs.existsSync(startPath)) {
		console.log("no dir ", startPath);
		return;
	}

	var files = fs.readdirSync(startPath);
	for(var i = 0; i < files.length; i++) {
		var fileName=path.join(startPath, files[i]);
		var stat = fs.lstatSync(fileName);
		if(stat.isDirectory()) {
			fromDir(fileName, filter); //recurse
		}
		else if (fileName.indexOf(filter) >= 0) {
			console.log('-- found: ', fileName);
			var p = parseImagePath(fileName);
			if(p !== null) {
				var newPath = createNewFilePath(p);
				if(newPath !== null) {
					fs.ensureFileSync(newPath);
					fs.moveSync(p[5], newPath, { overwrite: false });
				}
			}
		}
	}
}

function createNewFilePath(imageObject) {
	if(imageObject.length < 5) {
		console.log("imageObject size too small, returning null");
		return null;
	}
	var p = "data/" + imageObject[0] + "/" + imageObject[1] + "/" + imageObject[2] + "/" + imageObject[3] + "/" + imageObject[4] + ".jpg";
	console.log(p);
	return p;
}

function parseImagePath(imagePath) {
	var arr = imagePath.split("/");
	arr = arr.map(function(val) { return val; });
	console.log(arr);
	var fileName = arr[arr.length-1];
	var nameArr = fileName.split(".");
	nameArr = nameArr.map(function(val) { return val; });
	nameArr = nameArr[0].split("-");
	nameArr = nameArr.map(function(val) { return val; });
	var month = arr[2];
	var year = arr[1];
	var index;
	var day;
	var size;
	if(nameArr.length === 3) {
		// We have a size
		index = nameArr[0];
		day = nameArr[1];
		if(nameArr[2] === "1920x300") {
			size = 'Medium';
		} else if(nameArr[2] === "768x120") {
			size = 'Small';
		} else {
			console.log("Size is something undefined and weird!");
		}
	} else if(nameArr.length === 2) {
		// Full size
		if(nameArr[1] === "1920x300" || nameArr[1] === "768x120") {
			// We don't have a day index.
			console.log("No day index, returning Null");
			return null;
		}
		index = nameArr[0];
		day = nameArr[1];
		size = 'Large';
	} else if(nameArr.length === 1) {
		// No date!
		// huh??
		console.log("No day index, returning Null");
		return null;
	}

	var ret = [size, year, month, day, index, imagePath];
	console.log(ret);
	return ret;
}

fromDir(Folder2018, '.jpg');

