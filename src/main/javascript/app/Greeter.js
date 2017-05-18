'use strict';

var Displayer   = require('./Displayer'),
    jQuery    = $ = require('jquery'),
    addGreeting;

class Greeter extends Displayer {
  constructor (options) {
    super(options);
  }

  static display (greeting) {
    greeting = greeting || {};

    addGreeting(JSON.parse(greeting.body).message);
  }
}

module.exports = Greeter;

addGreeting = function (message) {
  let greeting = jQuery('<span/>', {
    class: 'notification msg_container'
  })
    .append(message);

  $('#messages')
    .append(greeting);
};
