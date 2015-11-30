// Unit tests for the chiasm-injector package.
//
// Draws from previous work found at
// https://github.com/chiasm-project/chiasm-layout/blob/master/test/layoutTest.js

var expect = require("chai").expect,
    Model = require("model-js"),
    Chiasm = require("chiasm"),
    ChiasmComponent = require("chiasm-component"),
    ChiasmInjector = require("./index.js");

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

// Simple Chiasm components that use a div or svg.
function DummyVisDIV(){
  var my = ChiasmComponent();
  my.initDIV();
  return my;
};
function DummyVisSVG (){
  var my = ChiasmComponent();
  my.initSVG();
  return my;
};

function initChiasm(){
  var chiasm = Chiasm();
  chiasm.plugins.injector = ChiasmInjector;
  chiasm.plugins.dummyVisDiv = DummyVisDIV;
  chiasm.plugins.dummyVisDiv = DummyVisSVG;
  return chiasm;
}

describe("chiasm-layout", function () {
  it("should inject a component node into a div", function(done) {

    var chiasm = initChiasm();

    chiasm.setConfig({
      myInjector: {
        plugin: "injector",
        state: {
          containers: {
            "componentA": ".A"
          }
        }
      },
      componentA: {
        plugin: "dummyVisDiv"
      }
    }).then(function(){
      chiasm.getComponent("componentA").then(function(componentA){

        // This setTimeout is necessary here to await the propagation of
        // the update through Model.js. Ideally this would not be necessary,
        // but I'm not quite sure how to fix it.
        setTimeout(function(){
          expect(divA.childNodes.length).to.equal(1);
          done();
        }, 0);

        //componentA.when("box", function(box){
        //  expect(box.x).to.equal(0);
        //  expect(box.y).to.equal(0);
        //  expect(box.width).to.equal(100);
        //  expect(box.height).to.equal(200);
        //  done();
        //});
      });
    }, function(err){
      console.log(err);
    });
  });
});
