// Created on 10/05/2018 by James Bentley

/*
	We want to parse our Mbox file to extract the attachments and sort them.

	We're going to use the node-mbox plugin for parsing.
*/

const Mbox = require('node-mbox');
const fs = require('fs-extra');