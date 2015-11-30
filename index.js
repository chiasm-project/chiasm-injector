var ChiasmComponent = require("chiasm-component");
var Model = require("model-js");

function ChiasmInjector(chiasm){
  var my = ChiasmComponent({

    // This is expected to be an object where
    //  * keys are component aliases,
    //  * values are container selector.
    containers: Model.None
  });

  my.when("containers", function (containers){
    if(containers !== Model.None){

      // TODO un-inject previously injected components.
      // TODO add a test for this
      // This means remove all DOM children from each container.

      // Inject the components into their specified containers.
      Object.keys(containers).forEach(function (alias){
        var selector = containers[alias];

        chiasm.getComponent(alias).then(function (component){

          document
            .querySelector(selector)
            .appendChild(component.el);

        }, console.log);
      });
    }
  });

  my.destroy = function (){
    // TODO un-inject previously injected components.
    // TODO add a test for this
    // This means remove all DOM children from each container.
  }
  
  return my;
}

module.exports = ChiasmInjector;
