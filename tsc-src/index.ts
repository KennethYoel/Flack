document.addEventListener('DOMContentLoaded', () => {
  // Connect to websocket
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  // When connected, configure buttons
  socket.on('connect', () => {
    document.querySelector('#messenger-form').onsubmit = () => {
      // By default, submit button is disabled
      document.querySelector('#submit-msg').disabled = true;

      // Enable button only if there is text in the input field
      document.querySelector('#userinput').onkeyup = () => {
        if (document.querySelector('#userinput').value.length > 0) {
          document.querySelector('#submit-msg').disabled = false;
        }
        else {
          document.querySelector('#submit-msg').disabled = true;
        }
      };

      // Each submission should emit a "submit chat" event, username, time stamp, and messages.
      const usersname = document.querySelector('#submit-msg').dataset.user;
      const t = new Date();
      const currentTime = t.toLocaleTimeString();
      const chats = document.getElementById('userinput').value;
      console.log(usersname);
      console.log(chats);
      socket.emit('submit chat', {'usersname': usersname, 'timestamp': currentTime, 'chats': chats });

      // Clear input field
      document.querySelector('#userinput').value = '';

      // Submit button is disabled again
      document.querySelector('#submit-msg').disabled = true;

      return false;
    };
  });

  // When a new message is announced, add to the unordered list
  socket.on('message all', (data) => {
    console.log(data);
    const username = document.querySelector('#submit-msg').dataset.user;

    if (typeof data.usersname != 'undefined') {
      if (data.usersname == username) {
        // Create new item for list
        const paraGraph = document.createElement('p');
        paraGraph.innerHTML = data.chats;
        // Add new item to chat list
        document.querySelector('#chat-sent').append(paraGraph);
      }
    }

    if (data.usersname != username) {
      // Create new item for list
      const paraGraph = document.createElement('p');
      paraGraph.innerHTML = data.chats;
      // Add new item to chat list
      document.querySelector('#chat-received').append(paraGraph);
       // Add name to received chat
       document.querySelector('#receiving-name').innerHTML = data.usersname; 
    }
  });
});
