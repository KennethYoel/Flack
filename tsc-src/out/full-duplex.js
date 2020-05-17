document.addEventListener('DOMContentLoaded', () => {
    // Connect to websocket.
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    // When connected, configure buttons
    socket.on('connect', () => {
        // Each button should emit a "submit vote" event
        const selection = document.querySelector('#user-input').value;
        socket.emit('submit message', { selection: selection });
    });
    // When a new message is submitted, the message is showned in the paragraph element.
    // socket.on('chats', (data) => {
    //   document.querySelector('#yes').innerHTML = data.yes;
    //   document.querySelector('#no').innerHTML = data.no;
    //   document.querySelector('#maybe').innerHTML = data.maybe;
    // });
    // When a new message is posted add to the paragraph element.
    socket.on('messages', (data) => {
        document.querySelector('#postedMessage').innerHTML = `Message recorded: ${data.selection}`;
    });
});
//# sourceMappingURL=full-duplex.js.map