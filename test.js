var expect = require("chai").expect,
    Model = require("model-js"),
    Chiasm = require("chiasm");

// Use JSDOM for DOM manipulation in Node.
// https://github.com/tmpvar/jsdom#creating-a-browser-like-window-object
// "var" omitted intentionally to induce global variables.
document = require("jsdom").jsdom();
window = document.parentWindow;


// Create a test case for selecting by class.
var divA = document.createElement("div");
divA.className = "A";
document.body.appendChild(divA);

// Create a few test cases for selecting by id.
var divB = document.createElement("div");
divB.id = "B";
document.body.appendChild(divB);

var divC = document.createElement("div");
divC.id = "C";
document.body.appendChild(divC);


