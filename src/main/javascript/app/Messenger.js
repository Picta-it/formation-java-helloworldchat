'use strict';

var Displayer = require('./Displayer'),
    jQuery    = $ = require('jquery'),
    moment    = $ = require('moment'),
    addMessage;

class Messenger extends Displayer {
  constructor (options) {
    super(options);
  }

  static display (message) {
    message = message || {};

    addMessage(JSON.parse(message.body));
  }
}

module.exports = Messenger;

addMessage = function (message) {
  var isSent = message.emitter === $('#name').val();
  var base_class = 'base_';
  var msg_class = 'msg_';
  var messageDate = new Date(message.emissionDate);
  var momentTime  = moment(messageDate).format('H:MM:SS');
  var momentDate  = moment(messageDate).format('dddd D MMM YYYY - H:MM:SS');
  var mainContainer;
  var messageContext;
  var messageContainer;
  var avatarContainer;
  var time;
  var message;

  console.log(messageDate);
  console.log(momentDate);

  mainContainer = jQuery('<div/>', {
    class: 'row msg_container'
  });

  messageContainer = jQuery('<div/>', {
    class: 'col-md-10 col-xs-10'
  });

  avatarContainer = jQuery('<div/>', {
    class: 'col-md-2 col-xs-2 avatar'
  })
    .append(jQuery('<img/>', {
      'src': 'http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg',
      class: 'img-responsive'
    }));

  messageContext = jQuery('<time/>', {
    'title': momentDate
  })
    .append(message.emitter +' ('+ momentTime + ')');

  message = jQuery('<div/>', {
    class: 'messages'
  })
    .append(jQuery('<p/>', {
      'src': 'http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg',
      class: 'img-responsive'
    })
      .append(message.content))
    .append(messageContext);


  messageContainer
    .append(message);

  if(isSent) {
    base_class += 'sent';
    msg_class += 'sent';

    messageContainer
      .addClass('msg_class');

    mainContainer
      .addClass('base_class')
      .append(messageContainer)
      .append(avatarContainer);
  } else {
    base_class += 'receive';
    msg_class += 'receive';

    messageContainer
      .addClass('msg_class');

    mainContainer
      .addClass('base_class')
      .append(avatarContainer)
      .append(messageContainer);
  }

  $('#messages')
    .append(mainContainer);
};
