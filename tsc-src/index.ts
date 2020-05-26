document.addEventListener('DOMContentLoaded', () => {
  // Connect to websocket
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  // When connected, configure buttons
  socket.on('connect', () => {
    document.querySelector('#submit_msg').onclick = () => {
      // By default, submit button is disabled
      document.querySelector('#submit_msg').disabled = true;

      // Enable button only if there is text in the input field
      document.querySelector('#user_input').onkeyup = () => {
        if (document.querySelector('#user_input').value.length > 0) {
          document.querySelector('#submit_msg').disabled = false;
        }
        else {
          document.querySelector('#submit_msg').disabled = true;
        }
      };

      // Each submission should emit a "submit vote" event
      const user_name = document.querySelector('#submit_msg').dataset.user;
      const chats = document.querySelector('#user_input').value;
      console.log(user_name);
      console.log(chats);
      socket.emit('submit chat', {'username': user_name, 'chats': chats });

      // Clear input field
      document.querySelector('#user_input').value = '';

      return false;
    };
  });

  // When a new message is announced, add to the unordered list
  socket.on('message all', (data) => {
    console.log(data);
    const username = document.querySelector('#submit_msg').dataset.user;

    if (typeof data.username != 'undefined') {
      if (data.username == username) {
        // Create new item for list
        const paraGraph = document.createElement('p');
        paraGraph.innerHTML = data.chats;
        // Add new item to chat list
        document.querySelector('#chat-sent').append(paraGraph);
      }
    }

    if (data.username != username) {
      // Create new item for list
      const paraGraph = document.createElement('p');
      paraGraph.innerHTML = data.chats;
      // Add new item to chat list
      document.querySelector('h5').innerHTML = data.username;
      document.querySelector('#chat-received').append(paraGraph);
    }
  });
});
