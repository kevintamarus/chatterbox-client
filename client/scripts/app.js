// YOUR CODE HERE:
$(document).ready(() => {
  app.init();

  $('#post-message').on('click', () => {
    let message = $('#message').val();
    let userName = window.location.search.slice(10);

    $('<div/>')
      .text(message)
      .prependTo('#chats');
    
    var data = {
      username: userName,
      text: message,
      roomname: 'lobby'
    };
      
    app.send(data);
    
    $('#message').val('');
  });
  
  $('#clear-message').on('click', () => {
    app.clearMessages();
  });
});

let app = {};

app.fetch = function() {
  $.ajax({
    url: this.server,
    type: 'GET',
    contentType: 'application/json',
    success: data => {
      app.renderMessage(data);
    },
    error: () => console.log('error')
  });
};

app.send = message => {
  $.ajax({
    url: this.server,
    data: JSON.stringify(message),
    type: 'POST',
    contentType: 'application/json',
    success: () => console.log('message sent'),
    error: () => console.log('message not sent')
  });
};

app.clearMessages = () => {
  $('#chats').html('');
};

app.renderMessage = (data) => {
  console.log(data);
  let messages = data.results;
  for (let i = 0; i < messages.length; i++) {
    let message = messages[i];
    let text = message.text;
    let roomname = message.roomname;
    let username = message.username;
    
    $('<div/>')
    .text(username + ' ' + roomname + ' ' + text)
    .prependTo('#chats');
    
  }
};

app.renderRoom = () => {};

app.init = () => {
  app.fetch();
};

app.server = 'http://parse.la.hackreactor.com/chatterbox/classes/messages';