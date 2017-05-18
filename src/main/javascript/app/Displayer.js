'use strict';

class Displayer {
  constructor (_target) {
    if (this.constructor === Displayer) {
      throw new Error('Can\'t instantiate abstract class!');
    }
  }

  static mapKeyAction (options, callback) {
    $(options.id).keyup(function(e){
      if(e.keyCode == 13)
      {
        let value = $(options.id).val();

        callback(value);

        Displayer.achieve(options)
      }
    });
  }

  static mapMouseAction (options, callback) {
    $( options.mouseId ).click(function() {
      let value = $(options.id).val();

      callback(value);

      Displayer.achieve(options);
    });
  }

  static achieve (options) {
    options.nextId = options.nextId || options.id;
    options.clear  = options.clear  || false;

    console.log(options.clear);

    if(options.clear) {
      $(options.id).val('');
    }

    $(options.nextId).focus();
  }
}

module.exports = Displayer;
