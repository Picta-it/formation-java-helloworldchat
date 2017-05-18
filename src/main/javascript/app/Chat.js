'use strict';

var SockJS    = require('sockjs-client'),
    Stomp     = require('webstomp-client'),
    _         = require('lodash'),
    inPrefix  = '/in',
    outPrefix = '/out';

class Chat {
  constructor (url) {
    let socket = new SockJS(url, {heartbeat: false});

    this._stompClient   = Stomp.over(socket);
    this._subscriptions = {};
  }

  subscribe (url, subscription) {
    this._subscriptions[url] = subscription;
  }

  connect () {
    this._stompClient.connect({}, function () {
      for(var url in this._subscriptions) {
        let subscription = this._subscriptions[url];

        url          = outPrefix + url;

        this._stompClient.subscribe(url, subscription);
      }
    }.bind(this));
  }

  send (url, data) {
    data = data || {};
    url  = inPrefix + url;

    console.log(url, data);
    console.log(url, JSON.stringify(data));

    this._stompClient.send(url, JSON.stringify(data), {});
  }
}

module.exports = Chat;
