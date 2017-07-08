// YOUR CODE HERE:
let app = {};

app.server = 'http://parse.la.hackreactor.com/chatterbox/classes/messages';

app.init = () => {
  app.fetch();
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

app.clearMessages = () => {
  $('#chats').html('');
};

app.renderMessage = data => {
  let messages = data.results;
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

app.renderRoom = () => {
  let newRoomName = prompt('Name your room:');
  let newOption = `<option value=${newRoomName.toLowerCase()} selected>${newRoomName}</option>`;
  $('select').append(newOption);
  $('#room-name')
    .text(newRoomName)
    .attr('data-room', newRoomName.toLowerCase());
  
  app.clearMessages();
};

$(document).ready(() => {

  app.init();

  $('#post-message').on('click', () => {
    let userName = window.location.search.slice(10);
    let message = $('#message').val();
    let roomName = $('#room-name').data('room');
    console.log(roomName);
    let data = {
      username: userName,
      text: message,
      roomname: roomName
    };
    console.log(data);
    app.send(data);
    
    $('#message').val('');
  });
  
  $('#clear-message').on('click', () => {
    app.clearMessages();
  });

  $('#make-room').on('click', () => {
    app.renderRoom();
  });

  $('select').change(() => {
    let room = $('select').val();
    $('#room-name')
      .text(room)
      .attr('data-room', room.toLowerCase());
  });

});