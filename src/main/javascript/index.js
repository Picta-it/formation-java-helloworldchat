'use strict';

var Chat      = require('./app/Chat'),
    jQuery    = $ = require('jquery'),
    chat      = new Chat('/chat-websocket'),
    Messenger = require('./app/Messenger'),
    Greeter   = require('./app/Greeter'),
    init     = function () {
      chat.subscribe('/greetings', Greeter.display);
      chat.subscribe('/messages', Messenger.display);

      chat.connect();

      $('form').on('submit', function (e) {
        e.preventDefault();
      });

      Greeter.mapKeyAction({
        id:     '#name',
        nextId: '#message',
        clear:  false
      }, sendGreeting);
      Messenger.mapKeyAction({
        id:     '#message',
        clear:  true
      }, sendMessage);
      Messenger.mapMouseAction({
        id:      '#message',
        mouseId: '#sendMessage',
        clear:   true
      }, sendMessage);
    }

function sendGreeting(name) {
  let data = {
    'message': name
  };

  chat.send('/greetings', data);
}

function sendMessage(message) {
  let data = {
    'emitter': $('#name').val(),
    'content': message
  };

  chat.send('/messages', data);
}

$(function () {
  $( document ).ready(function() { init(); });
});
