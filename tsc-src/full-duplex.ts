document.addEventListener('DOMContentLoaded', () => {
  // Connect to websocket.
  var socket = io.connect(
    location.protocol + '//' + document.domain + ':' + location.port
  );

  // When connected, configure buttons
  socket.on('connect', () => {
    // Each button should emit a "submit vote" event
    document.querySelectorAll('button').forEach((button) => {
      button.onclick = () => {
        const selection = button.dataset.vote;
        socket.emit('submit vote', { selection: selection });
      };
    });
  });

  // When a new vote is announced, the vote tallies is allocated to the span element.
  socket.on('vote totals', (data) => {
    document.querySelector('#yes').innerHTML = data.yes;
    document.querySelector('#no').innerHTML = data.no;
    document.querySelector('#maybe').innerHTML = data.maybe;
  });

  //   // When a new vote is announced add to the unordered list
  //   socket.on('announce vote', (data) => {
  //     const li = document.createElement('li');
  //     li.innerHTML = `Vote recorded: ${data.selection}`;
  //     document.querySelector('#votes').append(li);
  //   });
});
