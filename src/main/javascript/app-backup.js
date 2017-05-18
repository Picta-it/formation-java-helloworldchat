var stompClient = null;

function connect() {
  var socket;

  socket = new SockJS('/chat-websocket');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    stompClient.subscribe('/out/greetings', function (greeting) {
      addGreeting(JSON.parse(greeting.body).message);
    });
    stompClient.subscribe('/out/messages', function (message) {
      addMessage(JSON.parse(message.body));
    });
  });
}

function sendName() {
  var message;

  message = {
    'message': $("#name").val()
  };

  stompClient.send("/in/greetings", {}, JSON.stringify(message));
}

function sendMessage() {
  var message;

  message = {
    'emitter': $("#name").val(),
    'content': $('#message').val()
  };

  console.log('Sending message : ' + message);

  stompClient.send("/in/messages", {}, JSON.stringify(message));

  $( "#message" ).val("");
  $( "#message" ).focus();
}

function addGreeting(message) {
  var greeting = jQuery('<span/>', {
    class: 'notification msg_container'
  })
    .append(message);

  $("#messages")
    .append(greeting);
}

function addMessage(message) {
  var isSent = message.emitter === $("#name").val();
  var base_class = 'base_';
  var msg_class = 'msg_';
  var messageDate = formatDate(new Date(message.emissionDate));
  var mainContainer;
  var messageContainer;
  var avatarContainer;
  var time;
  var message;

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

  messageContext = jQuery('<time/>')
    .append(message.emitter +' • '+ messageDate);

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
}

function formatDate(date) {
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return [(dd>9 ? '' : '0') + dd,
      '/',
      (mm>9 ? '' : '0') + mm,
      '/',
      date.getFullYear()
     ].join('');
};

$(function () {
  $("form").on('submit', function (e) {
    e.preventDefault();
  });
  $( document ).ready(function() { connect(); });
  $( "#disconnect" ).click(function() { disconnect(); });
  $( "#name" ).keyup(function(e){
    if(e.keyCode == 13)
    {
      sendName();
      $( "#message" ).focus();
    }
  });
  $( "#message" ).keyup(function(e){
    if(e.keyCode == 13)
    {
      sendMessage();
    }
  });
  $( "#sendMessage" ).click(function() { sendMessage(); });
});
