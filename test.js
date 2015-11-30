// Unit tests for the chiasm-injector package.
//
// Draws from previous work found at
// https://github.com/chiasm-project/chiasm-layout/blob/master/test/layoutTest.js

var expect = require("chai").expect,
    Model = require("model-js"),
    Chiasm = require("chiasm"),
    ChiasmComponent = require("chiasm-component");

// Use JSDOM for DOM manipulation in Node.
// https://github.com/tmpvar/jsdom#creating-a-browser-like-window-object
// "var" omitted intentionally to induce global variables.
document = require("jsdom").jsdom();
window = document.parentWindow;


// Create a test case for selecting by class.
var divA = document.createElement("div");
divA.className = "A";
divA.clientWidth = 100;
divA.clientHeight = 200;
document.body.appendChild(divA);

// Create a few test cases for selecting by id.
var divB = document.createElement("div");
divB.id = "B";
divB.clientWidth = 300;
divB.clientHeight = 400;
document.body.appendChild(divB);

var divC = document.createElement("div");
divC.id = "C";
divC.clientWidth = 500;
divC.clientHeight = 600;
document.body.appendChild(divC);

function initChiasm(){
  var chiasm = Chiasm();

  chiasm.plugins.injector = require("./index");
  chiasm.plugins.dummyVis = function (){
    var my = ChiasmComponent();
    my.initDiv();
    return my;
  };

  // Mock the DOM container using jsdom.
  chiasm.getComponent("layout").then(function (layout){
    var div = document.createElement("div");
    div.clientHeight = div.clientWidth = 100;
    layout.container = div;
  });

  return chiasm;
}
