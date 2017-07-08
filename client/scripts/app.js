// YOUR CODE HERE:
$(document).ready(() => {
  app.init();
  
  $('#make-room').on('click', () => {
    let newRoomName = prompt('Name your room:');
    $('#room-name').text(newRoomName);
    
    let newOption = `<option value=${newRoomName} selected>${newRoomName}</option>`;
    $('select').append(newOption);
    
    app.clearMessages();
  });

  $('#post-message').on('click', () => {
    let message = $('#message').val();
    let userName = window.location.search.slice(10);
    
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

app.fetch = () => {
  $.ajax({
    url: app.server,
    type: 'GET',
    data: {order: '-createdAt'},
    contentType: 'application/json',
    success: data => {
      app.renderMessage(data);
    },
    error: () => console.log('error')
  });
};

app.send = message => {
  $.ajax({
    url: app.server,
    data: JSON.stringify(message),
    type: 'POST',
    contentType: 'application/json',
    success: (data) => console.log('message sent', data),
    error: () => console.log('message not sent')
  });
};

app.clearMessages = () => {
  $('#chats').html('');
};

app.renderMessage = data => {
  let messages = data.results;
  console.log(data);
  for (let i = 0; i < messages.length; i++) {
    let message = messages[i];
    let text = message.text;
    let roomname = message.roomname;
    let username = message.username;
    
    $('<div/>')
    .text(username + ' ' + roomname + ' ' + text)
    .appendTo('#chats');
    
  }
};

app.renderRoom = () => {};

app.init = () => {
  app.fetch();
};

app.server = 'http://parse.la.hackreactor.com/chatterbox/classes/messages';