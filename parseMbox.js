// Created on 10/05/2018 by James Bentley

/*
	We want to parse our Mbox file to extract the attachments and sort them.

	We're going to use the node-mbox plugin for parsing.
*/

const Mbox = require('node-mbox', { streaming : true });
const simpleParser = require('mailparser').simpleParser;
const fs = require('fs-extra');

const mbox = new Mbox('data/Sent-001.mbox');

mbox.on('message', function(stream) {
	// 'msg' is a 'Buffer' instance
	simpleParser(stream, (err, parsed) => {
		if(err)
			throw err;
		console.log(parsed.date);
		console.log(parsed.attachments.length);
		for(var i = 0; i < parsed.attachments.length; i++) {
			console.log(parsed.attachments[i].contentType);
			console.log(parsed.attachments[i].filename);
			if(parsed.attachments[i].contentType === "image/jpeg") {
				fs.writeFile(__dirname + "/data/Images/" + i + ".jpg", parsed.attachments[i].content, function(err) {
					if(err)
						throw err;
					console.log("Done writing: test" + parsed.date.toString());
				});
			}
		}
	});
	// console.log('got a message', msg.toString());
});

mbox.on('error', function(err) {
	console.log('got an error', err);
});

mbox.on('end', function() {
	console.log('done reading mbox file');
});

console.log("Hello, World!");