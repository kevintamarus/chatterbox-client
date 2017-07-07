// YOUR CODE HERE:
$(document).ready(function() {

  $('#post-message').on('click', function() {
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
});

let app = {};

app.fetch = function() {
  $.ajax({
    url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: (data) => console.log(data),
    error: () => console.log('error')
  });
};

app.send = function(message) {
  $.ajax({
    url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
    data: JSON.stringify(message),
    type: 'POST',
    contentType: 'application/json',
    success: () => console.log('message sent'),
    error: () => console.log('message not sent')
  });
};

app.init = function() {};