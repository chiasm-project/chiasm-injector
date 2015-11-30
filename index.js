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
}

module.exports = ChiasmInjector;
