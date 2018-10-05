// Created on 10/05/2018 by James Bentley

/*
	We want to parse our Mbox file to extract the attachments and sort them.

	We're going to use the node-mbox plugin for parsing.
*/

const Mbox = require('node-mbox');
const simpleParser = require('mailparser').simpleParser;
const fs = require('fs-extra');

const mbox = new Mbox('data/Sent-001.mbox');

mbox.on('message', function(msg) {
	// 'msg' is a 'Buffer' instance
	simpleParser(msg, (err, parsed) => {
		console.log(parsed);
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