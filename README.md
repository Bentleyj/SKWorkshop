# SunriseKingdomWorkshop

This is the repo for holding the code for the sunrise kingdom CMS Crosslab Workshop.

We'll be building a Node.js sorter, an mBox parser and a p5.js viewer

To run ourMBox parser you need to allocate additional memory for the node.js app because out Mbox file is to large.

to do this do the following: `node --max-old-space-size=9216 parseMbox.js`

### P5 project

This is a fun project file, we'll be using p5.js to draw out images and play around with them.

To launch this locally we want to follow the instructions [here](https://p5js.org/get-started/) for getting started with p5.js and [here](https://github.com/processing/p5.js/wiki/Local-server) for setting up a local server which we'll need to load our files. We;re going to use Sublime Text 3 as our IDE which you can download from [here](https://www.sublimetext.com/).

Some notes on getting setup, we're going to use the Node option to set everything up because we'll be installing node.js anyway. Don't forget to install http-server globally and make sure to run it with the flags:

`http-server -c-1`

And make sure you run it **IN THE P5.JS FOLDER** not in your example folder.